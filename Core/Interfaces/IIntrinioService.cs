using Core.Helpers;
using Intrinio.SDK.Model;

namespace Core.Interfaces
{
    public interface IIntrinioService
    {
        Task<PagedList<CompanySummary>> SearchCompanies(SearchCompanyParams searchParams);
        Task<Company> GetCompany(string identifier);
        Task<RealtimeStockPrice> GetLastDayStock(string identifier, string source);
    }
}