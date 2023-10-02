using API.Extensions;
using Core.Helpers;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Intrinio.SDK.Model;
using API.Helpers;

namespace API.Controllers
{
    public class CompaniesController : BaseApiController
    {
        private readonly ISecurityService _securityService;
        private readonly ICompanyService _companyService;
        public CompaniesController(ISecurityService intrinioService, ICompanyService companyService)
        {
            _companyService = companyService;
            _securityService = intrinioService;
        }

        [Cached(24)]
        [HttpGet("search")]
        public async Task<ActionResult<PagedList<CompanySummary>>> SearchCompanies(
            [FromQuery]SearchCompanyParams searchParams)
        {
            var companies = await _companyService.SearchCompanies(searchParams);

            Response.AddPaginationHeader(new PaginationHeader(companies.CurrentPage, companies.PageSize,
                companies.TotalCount, companies.TotalPages));
            
            return companies;
        }

        [Cached(24)]
        [HttpGet("all-companies")]
        public async Task<ActionResult<PagedList<CompanySummary>>> GetAllCompanies
            ([FromQuery]AllCompaniesParams parameters)
        {
            var companies = await _companyService.GetAllCompanies(parameters);

            Response.AddPaginationHeader(new PaginationHeader(companies.CurrentPage, companies.PageSize,
                companies.TotalCount, companies.TotalPages));
            
            return Ok(companies);
        }

        [Cached(24)]
        [HttpGet("{identifier}")]
        public async Task<ActionResult<Company>> GetCompanyWithIdentifier(string identifier)
        {
            var company = await _companyService.GetCompany(identifier);

            if (company == null) NotFound("Company not found");

            return Ok(company);
        }

        [Cached(2)]
        [HttpGet("realtime-stock-price")]
        public async Task<ActionResult<RealtimeStockPrice>> GetRealtimeStockPrice
            ([FromQuery]string identifier, [FromQuery]string source)
        {
            var result = await _securityService.GetRealtimeStockPrice(identifier, source);

            return Ok(result);
        }

        [Cached(2)]
        [HttpGet("stock-prices-by-security")]
        public async Task<ActionResult<ApiResponseSecurityStockPrices>> GetStockPricesBySecurity
            ([FromQuery]StockPricesBySecurityParams parameters)
        {
            var response = await _securityService.GetStockPricesBySecurity(parameters);

            if (response == null) return NotFound("Not found");

            return Ok(response);
        }
    }
}