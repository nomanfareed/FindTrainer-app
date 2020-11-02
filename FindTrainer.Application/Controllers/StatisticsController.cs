using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FindTrainer.Domain.Entities;
using FindTrainer.Persistence.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FindTrainer.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class StatisticsController : ApplicationController
    {
        private readonly ReadOnlyQuery<NewSignup> _newSignupsQuery;
        private readonly ReadOnlyQuery<UniqueSignin> _signinsQuery;
        private readonly ReadOnlyQuery<UserStats> _statsQuery;

        public StatisticsController(ReadOnlyQuery<NewSignup> newSignupQuery,
                                    ReadOnlyQuery<UniqueSignin> signinsQuery,
                                    ReadOnlyQuery<UserStats> statsQuery)
        {
            _newSignupsQuery = newSignupQuery;
            _signinsQuery = signinsQuery;
            _statsQuery = statsQuery;
        }


        [HttpGet("NewSignupsCount")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetNewSignupsCount(DateTime from, DateTime to)
        {
            int count = await _newSignupsQuery.Query.Where(x => x.SignupDate >= from && x.SignupDate <= to).SumAsync(x => x.UserNumber);

            return Ok(new { SignupCount = count });
        }


        [HttpGet("SigninsCount")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetNewSigninsCount(DateTime from, DateTime to)
        {
            int count = await _signinsQuery.Query.Where(x => x.SigninDate >= from && x.SigninDate <= to).SumAsync(x => x.UserNumber);

            return Ok(new { SigninCount = count });
        }

        [HttpGet("TrainerViews")]
        [Authorize(Roles = "Trainer")]
        public async Task<IActionResult> GetTrainerViews()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized("You are not authorized to access this page");
            }

            var prevDate = DateTime.Now.AddDays(-7).Date;

            var dataQuery = await _statsQuery.Query
                        .Where(x => x.TrainerId == CurrentUserId && x.DateAdded.Date > prevDate)
                        .GroupBy(grp => grp.DateAdded.Date)
                        .Select(y => new
                        {
                            Date = y.Key,
                            Views = y.Sum(x => x.Counter)
                        })
                        .ToListAsync();

            var dateTimes = new List<DateTime>();
            for (int i = 0; i < 7; i++)
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
                         select new UserForStatsDto
                         {
                             TrainerId = CurrentUserId,
                             ViewDate = e.Date,
                             Count = finalData == null ? 0 : finalData.Views
                         };

            result = result.OrderByDescending(x => x.ViewDate);

            return Ok(result);
        }
    }
}
