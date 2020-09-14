using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FindTrainer.Application.Dtos;
using FindTrainer.Domain.Entities.Security;
using FindTrainer.Persistence.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FindTrainer.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ApplicationController
    {
        private readonly ReadOnlyQuery<ApplicationUser> _usersQuery;
        private readonly IMapper _mapper;

        public UsersController(ReadOnlyQuery<ApplicationUser> usersQuery,
                               IMapper mapper)
        {
            _usersQuery = usersQuery;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _usersQuery.Get(id);
            if (user == null)
            {
                return NotFound();
            }

            var userToReturn = _mapper.Map<UserForDetailedDto>(user);

            return Ok(userToReturn);
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery] UserParams userParams)
        {
            IQueryable<ApplicationUser> usersQuery = BuildUsersQuery(userParams);
            List<ApplicationUser> users = await usersQuery.ToListAsync();

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            return Ok(usersToReturn);
        }

        private IQueryable<ApplicationUser> BuildUsersQuery(UserParams userParams)
        {
            IQueryable<ApplicationUser> query = _usersQuery.Query.Where(u => u.IsTrainer.HasValue && u.IsTrainer.Value && u.Id != UserId && (!userParams.Gender.HasValue || u.Gender == userParams.Gender.Value));
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
            userParams.OrderBy = userParams.OrderBy.ToLower();
            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
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
