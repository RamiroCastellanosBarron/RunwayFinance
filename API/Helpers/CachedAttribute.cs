using System.Text;
using System.Text.Json;
using API.Extensions;
using Core.Helpers;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers
{
    public class CachedAttribute : Attribute, IAsyncActionFilter
    {
        private readonly int _timeToLiveHours;
        public CachedAttribute(int timeToLiveHours)
        {
            _timeToLiveHours = timeToLiveHours;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var cacheService = context.HttpContext.RequestServices.GetRequiredService<IResponseCacheService>();

            var cacheKey = GenerateCacheKeyFromRequest(context.HttpContext.Request);
            var cachedResponseObj = await cacheService.GetCachedResponse(cacheKey);

            if (cachedResponseObj != null)
            {
                if (cachedResponseObj.PaginationHeader != null)
                {
                    context.HttpContext.Response.AddPaginationHeader(cachedResponseObj.PaginationHeader);
                }

                var contentResult = new ContentResult
                {
                    Content = cachedResponseObj.Response,
                    ContentType = "application/json",
                    StatusCode = 200
                };

                context.Result = contentResult;
                return;
            }

            var executedContext = await next();

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            if (executedContext.Result is OkObjectResult okObjectResult)
            {
                var paginationHeader = context.HttpContext.Response.Headers["Pagination"].ToString();
                PaginationHeader headerObj = null;

                if (!string.IsNullOrEmpty(paginationHeader))
                {
                    headerObj = JsonSerializer.Deserialize<PaginationHeader>(paginationHeader, options);
                }

                var cachedResponse = new CachedResponse
                {
                    Response = JsonSerializer.Serialize(okObjectResult.Value, options),
                    PaginationHeader = headerObj
                };

                await cacheService.CacheResponseAsync(cacheKey, cachedResponse, TimeSpan.FromHours(_timeToLiveHours));
            }
        }


        private string GenerateCacheKeyFromRequest(HttpRequest request)
        {
            var keyBuilder = new StringBuilder();

            keyBuilder.Append($"{request.Path}");

            foreach (var (key, value) in request.Query.OrderBy(x => x.Key))
            {
                keyBuilder.Append($"|{key}-{value}");
            }

            return keyBuilder.ToString();
        }
    }
}