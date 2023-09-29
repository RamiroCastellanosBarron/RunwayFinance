using API.Extensions;
using Core.Helpers;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Intrinio.SDK.Model;

namespace API.Controllers
{
    public class CompaniesController : BaseApiController
    {
        private readonly IIntrinioService _intrinioService;
        public CompaniesController(IIntrinioService intrinioService)
        {
            _intrinioService = intrinioService;
        }

        [HttpGet]
        public async Task<ActionResult> SearchCompanies([FromQuery]SearchCompanyParams searchParams)
        {
            var companies = await _intrinioService.SearchCompanies(searchParams);

            Response.AddPaginationHeader(new PaginationHeader(companies.CurrentPage, companies.PageSize,
                companies.TotalCount, companies.TotalPages));
            
            return Ok(companies);
        }

        [HttpGet("{identifier}")]
        public async Task<ActionResult<Company>> GetCompanyWithIdentifier(string identifier)
        {
            var company = await _intrinioService.GetCompany(identifier);

            if (company == null) NotFound("Company not found");

            return company;
        }

        [HttpGet("stock-last-day")]
        public async Task<ActionResult<RealtimeStockPrice>> GetLastDayStock
            ([FromQuery]string identifier, [FromQuery]string source)
        {
            var result = await _intrinioService.GetLastDayStock(identifier, source);

            return result;
        }
    }
}