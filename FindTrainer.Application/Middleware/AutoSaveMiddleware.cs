

using FindTrainer.Persistence;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace FindTrainer.Application.Middleware
{
    public class AutoSaveMiddleware
    { 
        private readonly RequestDelegate _next;

        public AutoSaveMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            await _next(context);
            var db = (DataContext)context.RequestServices.GetService(typeof(DataContext));
            await db.SaveChangesAsync();
        }
    }
}
