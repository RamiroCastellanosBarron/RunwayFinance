using Core.Helpers;

namespace Core.Interfaces
{
    public interface IResponseCacheService
    {
        Task CacheResponseAsync(string cacheKey, CachedResponse cachedResponse, TimeSpan timeToLive);
        Task<CachedResponse> GetCachedResponse(string cacheKey);
    }
}