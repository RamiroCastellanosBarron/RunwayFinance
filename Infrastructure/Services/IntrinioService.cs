using Core.Helpers;
using Core.Interfaces;
using Intrinio.SDK.Api;
using Intrinio.SDK.Model;
using Microsoft.Extensions.Options;

namespace Infrastructure.Services
{
    public class IntrinioService : IIntrinioService
    {
        private readonly CompanyApi _companyApi;
        private readonly SecurityApi _securityApi;
        public IntrinioService(IOptions<IntrinioSettings> config)
        {
            var companyApi = new CompanyApi();
            var securityApi = new SecurityApi();

            companyApi.Configuration.AddApiKey("api_key", config.Value.ApiKey);
            securityApi.Configuration.AddApiKey("api_key", config.Value.ApiKey);

            _companyApi = companyApi;
            _securityApi = securityApi;
        }

        public async Task<Company> GetCompany(string identifier)
        {
            var company = await _companyApi.GetCompanyAsync(identifier);

            return company;
        }

        public async Task<RealtimeStockPrice> GetLastDayStock(string identifier, string source)
        {
            return await _securityApi.GetSecurityRealtimePriceAsync(identifier);
        }

        public async Task<ApiResponseSecurityStockPrices> GetStockPricesBySecurity(StockPricesBySecurityParams parameters)
        {
            return await _securityApi.GetSecurityStockPricesAsync(parameters.Identifier, parameters.StartDate, parameters.EndDate,
                parameters.Frequency, parameters.PageSize, parameters.NextPage);
        }

        public async Task<PagedList<CompanySummary>> SearchCompanies(SearchCompanyParams searchParams)
        {
            var result = await _companyApi.SearchCompaniesAsync
                (searchParams.Search, searchParams.IsActive);

            return PagedList<CompanySummary>.Create(result.Companies, searchParams.PageNumber, searchParams.PageSize);
        }
    }
}