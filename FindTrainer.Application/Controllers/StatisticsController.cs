using System;
using System.Threading.Tasks;
using FindTrainer.Domain.Entities;
using FindTrainer.Persistence.Common;
using Microsoft.AspNetCore.Mvc;

namespace FindTrainer.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ApplicationController
    {
        private readonly ReadOnlyQuery<NewSignup> _newSignupsQuery;

        public StatisticsController(ReadOnlyQuery<NewSignup> newSignupQuery)
        {
            _newSignupsQuery = newSignupQuery;
        }


        [HttpGet("NewSignupsCount")]
        public async Task<IActionResult> GetNewSignupsCount(DateTime from, DateTime to)
        {
            int count = await _newSignupsQuery.Count(x => x.SignupDate >= from && x.SignupDate <= to);

            return Ok(new { SignupCount = count });
        }
    }
}
