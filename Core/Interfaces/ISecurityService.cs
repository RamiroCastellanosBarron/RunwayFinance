using Core.Helpers;
using Intrinio.SDK.Model;

namespace Core.Interfaces
{
    public interface ISecurityService
    {
        Task<RealtimeStockPrice> GetRealtimeStockPrice(string identifier, string source);
        Task<ApiResponseSecurityStockPrices> GetStockPricesBySecurity(StockPricesBySecurityParams parameters);
    }
}