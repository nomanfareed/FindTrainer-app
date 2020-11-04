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
using FindTrainer.Persistence.Repositorys;

namespace FindTrainer.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UserMessageController : ApplicationController
    {
        private readonly UserMessageRepository _userMessageRep;
        private readonly ReadOnlyQuery<UserMessage> _userMessageQuery;
        private readonly ReadOnlyQuery<ApplicationUser> _userQuery;
        private readonly IMapper _mapper;

        public UserMessageController(ReadOnlyQuery<UserMessage> userMessageQuery, UserMessageRepository userMessageRep , ReadOnlyQuery<ApplicationUser> userQuery, IMapper mapper)
        {
            _mapper = mapper;
            _userQuery = userQuery;
            _userMessageQuery = userMessageQuery;
            _userMessageRep = userMessageRep;
        }



        [HttpPost("SendMessage")]
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
        public async Task<IActionResult> GetCurrentTrainerMessages([FromQuery] UserMessageParams param)
        {
            var trainerMessages = await _userMessageRep.SortAndFilterMessage(param.SortType , param.titleFilter , param.contentFilter, param.userNameFilter , param.trainerFilter , CurrentUserId , null , param.PageNumber , param.PageSize );


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
        public async Task<IActionResult> GetCurrentUserMessages([FromQuery] UserMessageParams param)
        {

            var userMessages = await _userMessageRep.SortAndFilterMessage(param.SortType, param.titleFilter, param.contentFilter, param.userNameFilter, param.trainerFilter, null , CurrentUserId, param.PageNumber, param.PageSize);


            var messageToReturn = _mapper.Map<IEnumerable<UserMessagesDto>>(userMessages);


            return Ok(new { messageToReturn });
        }


        [HttpGet("TrainerMessages")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetTrainerMessages(int trainerId ,[FromQuery] UserMessageParams param)
        {

            var trainerMessages = await _userMessageRep.SortAndFilterMessage(param.SortType, param.titleFilter, param.contentFilter, param.userNameFilter, param.trainerFilter, trainerId, null, param.PageNumber, param.PageSize);


            var messageToReturn = _mapper.Map<IEnumerable<TrainerMessagesDto>>(trainerMessages);


            return Ok(new { trainerMessages });
        }

        [HttpDelete("Delete/{messageId}")]
        [Authorize(Roles = "Trainer, Admin, User")]
        public async Task<IActionResult> DeleteMessage(int messageId)
        {

            var Message = await _userMessageRep.DataSet.FindAsync(messageId);


            if(Message == null)
            {
                return BadRequest("Could not find a message with this Id");
            }

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
            return Ok(await _userMessageRep.GetLastWeekMessages(this.CurrentUserId));
        }

       
    }
}
