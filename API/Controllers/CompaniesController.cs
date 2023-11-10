using API.Extensions;
using Core.Helpers;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using API.Helpers;
using Newtonsoft.Json.Linq;
using API.DTOs;
using Newtonsoft.Json;
using System.Text;

namespace API.Controllers
{
    public class CompaniesController : BaseApiController
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;

        public CompaniesController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
        }

        [Cached(60*24)]
        [HttpGet("{ticker}")]
        public async Task<ActionResult<CompanyInfo>> GetCompanyWithTicker(string ticker)
        {
            var token = _configuration["TiingoSettings:Token"];
            var requestUrl = $"/iex/{ticker}?token={token}";

            var httpClient = _httpClientFactory.CreateClient("TiingoClient");

            var response = await httpClient.GetAsync(requestUrl);

            if (!response.IsSuccessStatusCode)
            {
                return BadRequest();
            }

            string responseBody = await response.Content.ReadAsStringAsync();

            if (string.IsNullOrEmpty(responseBody)) return BadRequest();

            var jsonData = JArray.Parse(responseBody);
            string jsonString = jsonData[0].ToString();
            CompanyInfo companyInfo = JsonConvert.DeserializeObject<CompanyInfo>(jsonString);

            return Ok(companyInfo);
        }

        [Cached(60*24)]
        [HttpGet("daily/{ticker}")]
        public async Task<ActionResult<List<DailyData>>> GetFundamentalsDailyData
            ([FromRoute] string ticker, [FromQuery] DailyParams dailyParams)
        {
            var token = _configuration["TiingoSettings:Token"];

            StringBuilder requestUrlBuilder = new StringBuilder($"/tiingo/fundamentals/{ticker}/daily?token={token}");

            if (dailyParams.StartDate.HasValue)
            {
                requestUrlBuilder.Append($"&startDate={dailyParams.StartDate.Value:yyyy-MM-ddTHH:mm:ss.fffZ}");
            }

            if (dailyParams.EndDate.HasValue)
            {
                requestUrlBuilder.Append($"&endDate={dailyParams.EndDate.Value:yyyy-MM-ddTHH:mm:ss.fffZ}");
            }

            var requestUrl = requestUrlBuilder.ToString();

            var httpClient = _httpClientFactory.CreateClient("TiingoClient");
            var response = await httpClient.GetAsync(requestUrl);

            if (!response.IsSuccessStatusCode)
            {
                return BadRequest();
            }

            string responseBody = await response.Content.ReadAsStringAsync();

            if (string.IsNullOrEmpty(responseBody)) return BadRequest();

            var jsonData = JArray.Parse(responseBody);
            string jsonString = jsonData.ToString();
            var fundamentalsDailyData = JsonConvert.DeserializeObject<List<DailyData>>(jsonString);

            return Ok(fundamentalsDailyData);
        }

        [Cached(60*24)]
        [HttpGet("meta/{ticker}")]
        public async Task<ActionResult<Meta>> GetMeta(string ticker)
        {
            var token = _configuration["TiingoSettings:Token"];
            var requestUrl = $"/tiingo/fundamentals/meta?tickers={ticker}&token={token}";

            var httpClient = _httpClientFactory.CreateClient("TiingoClient");

            var response = await httpClient.GetAsync(requestUrl);

            if (!response.IsSuccessStatusCode)
            {
                return BadRequest();
            }

            string responseBody = await response.Content.ReadAsStringAsync();

            if (string.IsNullOrEmpty(responseBody)) return BadRequest();

            var jsonData = JArray.Parse(responseBody);
            string jsonString = jsonData[0].ToString();
            var fundamentalsMetaData = JsonConvert.DeserializeObject<Meta>(jsonString);

            return Ok(fundamentalsMetaData);
        }

        [Cached(60*24)]
        [HttpGet("interday-prices/{ticker}")]
        public async Task<ActionResult<List<InterdayPrice>>> GetHistoricalIntradayPricesEndpoint
            ([FromRoute] string ticker, [FromQuery] InterdayPriceParams interdayParams)
        {
            var token = _configuration["TiingoSettings:Token"];

            StringBuilder requestUrlBuilder = new StringBuilder($"/iex/{ticker}/prices?token={token}");

            if (interdayParams.StartDate.HasValue)
            {
                requestUrlBuilder.Append($"&startDate={interdayParams.StartDate.Value}");
            }

            if (interdayParams.EndDate.HasValue)
            {
                requestUrlBuilder.Append($"&endDate={interdayParams.EndDate.Value}");
            }

            requestUrlBuilder.Append($"&requestFreq={interdayParams.RequestFreq}");

            var requestUrl = requestUrlBuilder.ToString();

            var httpClient = _httpClientFactory.CreateClient("TiingoClient");
            var response = await httpClient.GetAsync(requestUrl);

            if (!response.IsSuccessStatusCode)
            {
                return BadRequest();
            }

            string responseBody = await response.Content.ReadAsStringAsync();

            if (string.IsNullOrEmpty(responseBody)) return BadRequest();

            var jsonData = JArray.Parse(responseBody);
            string jsonString = jsonData.ToString();
            var interdayPrices = JsonConvert.DeserializeObject<List<InterdayPrice>>(jsonString);

            return Ok(interdayPrices);
        }

        [Cached(60*24)]
        [HttpGet("dividend-yield/{ticker}")]
        public async Task<ActionResult<List<DividendYield>>> GetDividendYield
            ([FromRoute] string ticker)
        {
            var token = _configuration["TiingoSettings:Token"];
            var requestUrl = $"/tiingo/corporate-actions/{ticker}/distribution-yield?token={token}";

            var httpClient = _httpClientFactory.CreateClient("TiingoClient");

            var response = await httpClient.GetAsync(requestUrl);

            if (!response.IsSuccessStatusCode)
            {
                return BadRequest();
            }

            string responseBody = await response.Content.ReadAsStringAsync();

            if (string.IsNullOrEmpty(responseBody)) return BadRequest();

            var jsonData = JArray.Parse(responseBody);
            string jsonString = jsonData.ToString();
            var dividendYields = JsonConvert.DeserializeObject<List<DividendYield>>(jsonString);

            if (dividendYields.Count == 0) {
                return BadRequest("There are no dividend yields");
            }

            var lastDividend = dividendYields.Last();

            return Ok(lastDividend);
        }
    }
}