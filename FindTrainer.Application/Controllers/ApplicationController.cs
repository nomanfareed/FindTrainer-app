using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FindTrainer.Application.Controllers
{
    [Authorize]
    public abstract class ApplicationController : ControllerBase
    {
        protected int UserId => int.Parse(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
    }
}
