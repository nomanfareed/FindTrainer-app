using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using API.Data;
using API.Dtos;
using API.Helpers;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using API.Helpers.Params;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using FindTrainerApp.API.DataServices.Interface;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IFindTrainerRepository _repo;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<User> _genUserRepo;
        private readonly IUserService _userService;

        public UsersController(IFindTrainerRepository repo, IMapper mapper, IGenericRepository<User> genRepoUser, IUserService userService)
        {
            _mapper = mapper;
            _repo = repo;
            _genUserRepo = genRepoUser;
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery] UserParams userParams)
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier) == null ? null : User.FindFirst(ClaimTypes.NameIdentifier).Value;

            if (currentUserId != null)
            {
                userParams.UserId = Guid.Parse(currentUserId);
            }

            var users = await _repo.GetUsers(userParams);

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            Response.AddPagination(users.CurrentPage, users.PageSize,
                 users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(Guid id)
        {
            var user = await _genUserRepo.GetByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var userToReturn = _mapper.Map<UserForDetailedDto>(user);

            return Ok(userToReturn);
        }
        [ServiceFilter(typeof(LogUserActivity))]
        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateUser(UserDefaultIntakeDto userForUpdateDto)
        {
            var UserId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var users = await _genUserRepo.ListAllAsync();
            var userFromRepo = users.Include(x => x.Address).Include(x => x.Focus).FirstOrDefault(x => x.Id == UserId);

            if (userFromRepo == null)
                return Unauthorized();

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _genUserRepo.SaveAll())
                return Ok();

            throw new Exception($"Fail to update user {UserId}");
        }
        // [ServiceFilter(typeof(LogUserActivity))]
        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeleteUser()
        {
            var UserId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _genUserRepo.GetByIdAsync(UserId);

            if (userFromRepo == null)
                return Unauthorized();

            try
            {
                _userService.Delete(new Models.User { Id = UserId });
                return Ok();
            }
            catch (Exception)
            {
                throw new Exception($"Fail to delete user {UserId}");
            }

        }
    }
}