using System.Text;
using API.DTOs;
using API.Helpers;
using Core.Helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace API.Controllers
{
    public class EndOfDayController : BaseApiController
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;
        public EndOfDayController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
        }

        //https://api.tiingo.com/tiingo/daily/msft/prices?token={{token}}
        [Cached(120)]
        [HttpGet("{ticker}")]
        public async Task<ActionResult<List<EndOfDay>>> GetEndOfDay
            ([FromRoute]string ticker, [FromQuery]EndOfDayParams endOfDayParams)
        {
            var token = _configuration["TiingoSettings:Token"];

            StringBuilder requestUrlBuilder = new StringBuilder($"/tiingo/daily/{ticker}/prices?token={token}");

            if (!string.IsNullOrEmpty(endOfDayParams.StartDate))
            {
                requestUrlBuilder.Append($"&startDate={endOfDayParams.StartDate}");
            }

            if (!string.IsNullOrEmpty(endOfDayParams.EndDate))
            {
                requestUrlBuilder.Append($"&endDate={endOfDayParams.EndDate}");
            }

            if (!string.IsNullOrEmpty(endOfDayParams.ResampleFreq))
            {
                requestUrlBuilder.Append($"&resampleFreq={endOfDayParams.ResampleFreq}");
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
            var endOfDay = JsonConvert.DeserializeObject<List<EndOfDay>>(jsonString);

            return Ok(endOfDay);
        }

        //https://api.tiingo.com/tiingo/daily/<ticker>
        [Cached(120)]
        [HttpGet("meta/{ticker}")]
        public async Task<ActionResult<EndOfDayMeta>> GetMeta(string ticker)
        {
            var token = _configuration["TiingoSettings:Token"];
            var requestUrl = $"/tiingo/daily/{ticker}?token={token}";

            var httpClient = _httpClientFactory.CreateClient("TiingoClient");

            var response = await httpClient.GetAsync(requestUrl);

            if (!response.IsSuccessStatusCode)
            {
                return BadRequest();
            }

            string responseBody = await response.Content.ReadAsStringAsync();

            if (string.IsNullOrEmpty(responseBody)) return BadRequest();

            string jsonString = responseBody.ToString();
            var endOfDayMeta = JsonConvert.DeserializeObject<EndOfDayMeta>(jsonString);

            return Ok(endOfDayMeta);
        }
    }
}