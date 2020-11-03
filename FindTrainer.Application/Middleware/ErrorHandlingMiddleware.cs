using FindTrainer.Domain.Exceptions;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace FindTrainer.Application.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                HandleExceptionAsync(context, ex);
                throw new GlobalException(ex);
            }
        }

        private void HandleExceptionAsync(HttpContext context, Exception ex)
        {
            Utilities.Logger.Error(ex);
        }
    }
}
