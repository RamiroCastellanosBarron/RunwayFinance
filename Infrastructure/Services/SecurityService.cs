using Core.Helpers;
using Core.Interfaces;
using Intrinio.SDK.Api;
using Intrinio.SDK.Model;
using Microsoft.Extensions.Options;

namespace Infrastructure.Services
{
    public class SecurityService : ISecurityService
    {
        private readonly SecurityApi _securityApi;
        public SecurityService(IOptions<IntrinioSettings> config)
        {
            var securityApi = new SecurityApi();

            securityApi.Configuration.AddApiKey("api_key", config.Value.ApiKey);

            _securityApi = securityApi;
        }

        public async Task<RealtimeStockPrice> GetRealtimeStockPrice(string identifier, string source)
        {
            return await _securityApi.GetSecurityRealtimePriceAsync(identifier);
        }

        public async Task<ApiResponseSecurityStockPrices> GetStockPricesBySecurity(StockPricesBySecurityParams parameters)
        {
            return await _securityApi.GetSecurityStockPricesAsync(parameters.Identifier, parameters.StartDate, parameters.EndDate,
                parameters.Frequency, parameters.PageSize, parameters.NextPage);
        }
    }
}