using Core.Helpers;
using Core.Interfaces;
using Intrinio.SDK.Api;
using Intrinio.SDK.Model;
using Microsoft.Extensions.Options;

namespace Infrastructure.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly CompanyApi _companyApi;
        public CompanyService(IOptions<IntrinioSettings> config)
        {
            var companyApi = new CompanyApi();

            companyApi.Configuration.AddApiKey("api_key", config.Value.ApiKey);

            _companyApi = companyApi;
        }

        public async Task<PagedList<CompanySummary>> GetAllCompanies(AllCompaniesParams parameters)
        {
            ApiResponseCompanies result = await _companyApi.GetAllCompaniesAsync(parameters.LatestFilingDate, parameters.Sic,
                parameters.Template, parameters.Sector, parameters.IndustryCategory,
                parameters.IndustryGroup, parameters.HasFundamentals, parameters.HasStockPrices,
                parameters.TheaEnabled, parameters.PageSize, parameters.NextPage);

            return PagedList<CompanySummary>.Create(result.Companies, parameters.PageNumber, parameters.PageSize);
        }

        public async Task<Company> GetCompany(string identifier)
        {
            var company = await _companyApi.GetCompanyAsync(identifier);

            return company;
        }

        public async Task<PagedList<CompanySummary>> SearchCompanies(SearchCompanyParams searchParams)
        {
            ApiResponseCompaniesSearch result = await _companyApi.SearchCompaniesAsync
                (searchParams.Search, searchParams.IsActive);

            return PagedList<CompanySummary>.Create(result.Companies, searchParams.PageNumber, searchParams.PageSize);
        }
    }
}