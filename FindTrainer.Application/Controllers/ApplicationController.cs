using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FindTrainer.Application.Controllers
{
    public abstract class ApplicationController : ControllerBase
    {
        protected int CurrentUserId => int.Parse(HttpContext.User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).Single().Value);
    }
}
