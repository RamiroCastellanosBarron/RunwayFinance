using Core.Helpers;
using Intrinio.SDK.Model;

namespace Core.Interfaces
{
    public interface ICompanyService
    {
        Task<PagedList<CompanySummary>> SearchCompanies(SearchCompanyParams searchParams);
        Task<Company> GetCompany(string identifier);
        Task<PagedList<CompanySummary>> GetAllCompanies(AllCompaniesParams parameters);
    }
}