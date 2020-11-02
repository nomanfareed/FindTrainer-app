using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FindTrainer.Application.Dtos;
using FindTrainer.Domain.Entities.Security;
using FindTrainer.Persistence.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FindTrainer.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ApplicationController
    {
        private readonly ReadOnlyQuery<ApplicationUser> _usersQuery;
        private readonly Repository<ApplicationUser> _usersReop;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public UsersController(ReadOnlyQuery<ApplicationUser> usersQuery,
                               Repository<ApplicationUser> usersRepo,
                               UserManager<ApplicationUser> userManager,
                               IMapper mapper)
        {
            _usersQuery = usersQuery;
            _usersReop = usersRepo;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet("{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUser(int userId)
        {
            var user = await _usersQuery.Get(userId);
            if (user == null)
            {
                return NotFound("No such trainer exist with the specified ID");
            }

            if (user.IsTrainer.HasValue && user.IsTrainer.Value)
            {
                var dbStats = await _statsRepo.DataSet.FirstOrDefaultAsync(stats => stats.TrainerId == user.Id && 
                                                                        stats.DateAdded.Date == DateTime.Now.Date);
                if (dbStats == null)
                {
                    await _statsRepo.Add(new UserStats
                    {
                        TrainerId = userId,
                        Counter = 1,
                        DateAdded = DateTime.Now.Date
                    });
                } else
                {
                    dbStats.Counter++;
                    await _statsRepo.SaveChangesAsync();
                }
            }

            var userToReturn = _mapper.Map<UserForDetailedDto>(user);

            return Ok(userToReturn);
        }


        [HttpPut]
        [Authorize(Roles = "Admin, Trainer, User")]
        public async Task<IActionResult> UpdateUser(UserDefaultIntakeDto userForUpdateDto)
        {
            ApplicationUser currentUser = await _usersReop.DataSet.Where(usr => usr.Id == CurrentUserId)
                                                            .Include(x => x.Address)
                                                            .Include(x => x.ApplicationUserFocuses)
                                                            .ThenInclude(x => x.Focus)
                                                            .SingleAsync();

            _mapper.Map(userForUpdateDto, currentUser);

            return Ok();
        }

        [HttpDelete]
        [Authorize(Roles = "Admin,Trainer,User")]
        public async Task<IActionResult> DeleteUser()
        {
            ApplicationUser user = await _userManager.FindByIdAsync(CurrentUserId.ToString());
            IdentityResult result = await _userManager.DeleteAsync(user);


            if (!result.Succeeded)
            {
                return BadRequest(result.Errors.Select(e => e.Description).ToList());
            }


            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("Delete/{userId}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            ApplicationUser user = await _userManager.FindByIdAsync(userId.ToString());
            if(user == null)
            {
                return NotFound("No such user with the specified ID");
            }

            IdentityResult result = await _userManager.DeleteAsync(user);


            if (!result.Succeeded)
            {
                return BadRequest(result.Errors.Select(e => e.Description).ToList());
            }


            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetUsers([FromQuery] UserParams userParams)
        {
            IQueryable<ApplicationUser> usersQuery = BuildUsersQuery(userParams);
            List<ApplicationUser> users = await usersQuery.ToListAsync();

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            return Ok(usersToReturn);
        }

        private IQueryable<ApplicationUser> BuildUsersQuery(UserParams userParams)
        {
            IQueryable<ApplicationUser> query = _usersQuery.Query.Where(u => u.IsTrainer.HasValue && u.IsTrainer.Value && u.Id != CurrentUserId && (!userParams.Gender.HasValue || u.Gender == userParams.Gender.Value));
            if (!string.IsNullOrEmpty(userParams.City))
            {
                query = query.Where(u => u.Address != null && u.Address.City == userParams.City);
            }
            if (!string.IsNullOrEmpty(userParams.Country))
            {
                query = query.Where(u => u.Address != null && u.Address.Country == userParams.Country);
            }
            if (!string.IsNullOrEmpty(userParams.Province))
            {
                query = query.Where(u => u.Address != null && u.Address.Province == userParams.Province);
            }

            //Known As
            if (!string.IsNullOrEmpty(userParams.KnownAs))
            {
                query = query.Where(u => u.KnownAs == userParams.KnownAs);
            }
            //Order By
            
            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                userParams.OrderBy = userParams.OrderBy.ToLower();
                switch (userParams.OrderBy)
                {
                    
                    case "popular":
                        query = query.OrderByDescending(u => u.ReviewsReceived.Count());
                        break;
                    case "highest-rated":
                        query = query.OrderByDescending(u => u.ReviewsReceived.Average(x => x.Stars));
                        break;
                    case "newest":
                        query = query.OrderByDescending(u => u.Created);
                        break;
                    default:
                        query = query.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

            int skip = (userParams.PageNumber - 1) * userParams.PageSize;
            query = query.Skip(skip).Take(userParams.PageSize);

            return query;
        }
    }
}
