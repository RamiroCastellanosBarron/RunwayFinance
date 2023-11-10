using System.Text;
using API.DTOs;
using API.Helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace API.Controllers
{
    public class SearchController : BaseApiController
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;
        public SearchController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
        }


        //https://api.tiingo.com/tiingo/utilities/search?query=apple&token={{token2}}
        [Cached(60*24)]
        [HttpGet]
        public async Task<ActionResult<List<SearchDto>>> GetSearchResults
            ([FromQuery]string query)
        {
            var token = _configuration["TiingoSettings:Token"];

            var requestUrlBuilder = new StringBuilder($"/tiingo/utilities/search?token={token}");

            if (!string.IsNullOrEmpty(query))
            {
                requestUrlBuilder.Append($"&query={query}");
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
            var search = JsonConvert.DeserializeObject<List<SearchDto>>(jsonString);

            return Ok(search);
        }
    }
}