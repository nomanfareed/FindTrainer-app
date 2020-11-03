using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FindTrainer.Application.Dtos;
using FindTrainer.Domain.Entities;
using FindTrainer.Persistence.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FindTrainer.Application.Dtos.UserMessage;
using AutoMapper;
using FindTrainer.Domain.Entities.Security;

namespace FindTrainer.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UserMessageController : ApplicationController
    {
        private readonly Repository<UserMessage> _userMessageRep;
        private readonly ReadOnlyQuery<UserMessage> _userMessageQuery;
        private readonly ReadOnlyQuery<ApplicationUser> _userQuery;
        private readonly IMapper _mapper;

        public UserMessageController(ReadOnlyQuery<UserMessage> userMessageQuery, Repository<UserMessage> userMessageRep , ReadOnlyQuery<ApplicationUser> userQuery, IMapper mapper)
        {
            _mapper = mapper;
            _userQuery = userQuery;
            _userMessageQuery = userMessageQuery;
            _userMessageRep = userMessageRep;
        }



        [HttpPost("SendMessage")]
        //[AllowAnonymous()]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> SendMessage([FromBody] UserMessageCreationDto message)
        {
            var userId = this.CurrentUserId;

            var trainer = await _userQuery.Get(message.TrainerId);

            if(trainer == null || trainer.IsTrainer == false)
            {
                return BadRequest("user can only send message to trainer");
            }


            var model = new UserMessage
            {
                ExpireDateTime = DateTime.Now.AddDays(Constants.MessagesLifeSpan),
                VisiteDateTime = null,
                CreateDateTime = DateTime.Now,
                Title = message.Title,
                Content = message.Content,
                TrainerId = message.TrainerId,
                UserId = userId
            };

            await _userMessageRep.Add(model);


            return Ok();
        }

        [HttpGet("Messages")]
        [Authorize(Roles = "Trainer")]
        public async Task<IActionResult> GetCurrentTrainerMessages(int pageNumber, int pageSize = Constants.Paging.DefaultPageSize)
        {
            if (pageSize > Constants.Paging.MaxPageSize)
            {
                return BadRequest($"The maximum page size is {Constants.Paging.MaxPageSize}");
            }

            int skip = (pageNumber - 1) * pageSize;
            var trainerMessages = await _userMessageQuery.Query.Where(x => x.TrainerId == this.CurrentUserId).Include(i => i.User).OrderByDescending(i => i.Id).Skip(skip).Take(pageSize).ToListAsync();


            var messageToReturn = _mapper.Map<IEnumerable<TrainerMessagesDto>>(trainerMessages);

            // Update visit dateTime
            foreach (var item in trainerMessages.Where(i => i.VisiteDateTime == null).ToList())
            {
                item.VisiteDateTime = DateTime.Now;
                _userMessageRep.Update(item);
            }

            await _userMessageRep.SaveChangesAsync();

            return Ok(new { messageToReturn });
        }

        [HttpGet("SentMessages")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetCurrentUserMessages(int pageNumber, int pageSize = Constants.Paging.DefaultPageSize)
        {
            int skip = (pageNumber - 1) * pageSize;
            var userMessages = await _userMessageQuery.Query.Where(x => x.UserId == this.CurrentUserId).Include(i => i.Trainer).OrderByDescending(i => i.Id).Skip(skip).Take(pageSize).ToListAsync();


            var messageToReturn = _mapper.Map<IEnumerable<UserMessagesDto>>(userMessages);


            return Ok(new { messageToReturn });
        }


        [HttpGet("TrainerMessages")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetTrainerMessages(int trainerId, int pageNumber, int pageSize = Constants.Paging.DefaultPageSize)
        {
            int skip = (pageNumber - 1) * pageSize;

            var trainerMessages = await _userMessageQuery.Query.Where(x => x.TrainerId == trainerId).Include(i => i.User).OrderByDescending(i => i.Id).Skip(skip).Take(pageSize).ToListAsync();


            var messageToReturn = _mapper.Map<IEnumerable<TrainerMessagesDto>>(trainerMessages);


            return Ok(new { trainerMessages });
        }

        [HttpDelete("Delete/{messageId}")]
        [Authorize(Roles = "Trainer, Admin, User")]
        public async Task<IActionResult> DeleteMessage(int messageId)
        {

            var Message = await _userMessageRep.DataSet.FindAsync(messageId);

            // validate ownership
            if (User.IsInRole("Trainer") && Message.TrainerId != CurrentUserId)
            {
                return Forbid("This message is not yours");
            }

            if (User.IsInRole("User") && Message.UserId != CurrentUserId)
            {
                return Forbid("This message is not yours");
            }


             _userMessageRep.DataSet.Remove(Message);

            await _userMessageRep.SaveChangesAsync();


            return Ok();

        }



        [HttpGet("MessagesLastWeek")]
        [Authorize(Roles = "Trainer")]
        public async Task<IActionResult> GetTrainerMessagesLastWeek()
        {
            return Ok(await GetMessages());
        }

        private async Task<int[]> GetMessages()
        {
            var Id = this.CurrentUserId;

            int statsDays = 8; int counter = 0;
            int[] arr = new int[statsDays];

            var prevDate = DateTime.Now.AddDays(-statsDays).Date;
            var dataQuery = await _userMessageQuery.Query
                        .Where(x => x.TrainerId == Id && x.CreateDateTime.Date > prevDate)
                        .GroupBy(grp => grp.CreateDateTime.Date)
                        .Select(y => new
                        {
                            Date = y.Key,
                            Count = y.Count()
                        })
                        .ToListAsync();

            var dateTimes = new List<DateTime>();
            for (int i = 0; i < statsDays; i++)
            {
                dateTimes.Add(DateTime.Now.Date.AddDays(-i));
            }

            var emptyTableQuery = from dt in dateTimes
                                  select new
                                  {
                                      dt.Date,
                                      Count = 0
                                  };

            var result = from e in emptyTableQuery
                         join data in dataQuery on e.Date equals data.Date into g
                         from finalData in g.DefaultIfEmpty()
                         select new
                         {
                             TrainerId = CurrentUserId,
                             ViewDate = e.Date,
                             Count = finalData == null ? 0 : finalData.Count
                         };

            result = result.OrderBy(x => x.ViewDate).ToList();


            foreach (var item in result)
            {
                arr[counter] = item.Count;
                counter++;
            }

            return arr;
        }
    }
}
