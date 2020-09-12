using System;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            var userId = resultContext.HttpContext.User
               .FindFirst(ClaimTypes.NameIdentifier).Value;
            if (userId != null)
            {
                var repo = resultContext.HttpContext.RequestServices.GetService<IGenericRepository<User>>();
                var user = await repo.GetByIdAsync(Guid.Parse(userId));
                user.LastActive = DateTime.Now;
                await repo.SaveAll();
            }
        }
    }
}