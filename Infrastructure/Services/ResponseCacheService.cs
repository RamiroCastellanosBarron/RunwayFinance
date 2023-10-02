using System.Text.Json;
using Core.Helpers;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Services
{
    public class ResponseCacheService : IResponseCacheService
    {
        private readonly IDatabase _database;
        public ResponseCacheService(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        public async Task CacheResponseAsync(string cacheKey, CachedResponse response, TimeSpan timeToLive)
        {
            if (response == null) return;

            var serialisedResponse = JsonSerializer.Serialize(response);

            await _database.StringSetAsync(cacheKey, serialisedResponse, timeToLive);
        }

        public async Task<CachedResponse> GetCachedResponse(string cacheKey)
        {
            var cachedResponse = await _database.StringGetAsync(cacheKey);

            if (cachedResponse.IsNullOrEmpty) return null;

            var thingToReturn = JsonSerializer.Deserialize<CachedResponse>(cachedResponse);

            return thingToReturn;
        }
    }
}