using System;
using System.Linq;
using System.Threading.Tasks;
using FindTrainer.Domain.Entities;
using FindTrainer.Persistence.Common;
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

        public StatisticsController(ReadOnlyQuery<NewSignup> newSignupQuery,
                                    ReadOnlyQuery<UniqueSignin> signinsQuery)
        {
            _newSignupsQuery = newSignupQuery;
            _signinsQuery = signinsQuery;
        }


        [HttpGet("NewSignupsCount")]
        public async Task<IActionResult> GetNewSignupsCount(DateTime from, DateTime to)
        {
            int count = await _newSignupsQuery.Query.Where(x => x.SignupDate >= from && x.SignupDate <= to).SumAsync(x => x.UserNumber);

            return Ok(new { SignupCount = count });
        }


        [HttpGet("SigninsCount")]
        public async Task<IActionResult> GetNewSigninsCount(DateTime from, DateTime to)
        {
            int count = await _signinsQuery.Query.Where(x => x.SigninDate >= from && x.SigninDate <= to).SumAsync(x => x.UserNumber);

            return Ok(new { SigninCount = count });
        }
    }
}
