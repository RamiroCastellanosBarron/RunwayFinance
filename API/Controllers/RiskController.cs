using System.Text;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using MathNet.Numerics.Distributions;
using MathNet.Numerics.LinearAlgebra;
using MathNet.Numerics.Optimization;
using Core.Helpers;
using Core.Interfaces;
using System.Text.Json;

namespace API.Controllers
{
    public class RiskController : BaseApiController
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;
        private readonly IResponseCacheService _responseCacheService;
        public RiskController(IHttpClientFactory httpClientFactory, IConfiguration configuration, IResponseCacheService responseCacheService)
        {
            _responseCacheService = responseCacheService;
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
        }

        [HttpGet("{ticker}")]
        public async Task<ActionResult<List<RiskDto>>> GetCompanyRisk
            (string ticker, [FromQuery]RiskParams riskParams)
        {
            var apiKey = _configuration["AlphaVantageSettings:ApiKey"];

            var dailyDataResponse = await GetTimeSeriesDaily(ticker, apiKey);
            StockData dailyData = dailyDataResponse.Value;
            var balanceSheetsResponse = await GetAnnualReports(ticker, apiKey);
            AnnualReportsRoot balanceSheets = balanceSheetsResponse.Value;

            double desviacionEstandar = GetStandardDeviation(dailyData);

            var risks = new List<RiskDto>()
            {
                new RiskDto { 
                    Amount = long.Parse(balanceSheets.AnnualReports.FirstOrDefault(x => x.FiscalDateEnding.Contains("2022")).CurrentDebt), 
                    Deadline = 1, 
                    Rating = "A" 
                },
                new RiskDto { 
                    Amount = long.Parse(balanceSheets.AnnualReports.FirstOrDefault(x => x.FiscalDateEnding.Contains("2021")).CurrentDebt), 
                    Deadline = 2, 
                    Rating = "A" 
                },
                new RiskDto 
                {
                    Amount = long.Parse(balanceSheets.AnnualReports.FirstOrDefault(x => x.FiscalDateEnding.Contains("2020")).CurrentDebt), 
                    Deadline = 3, 
                    Rating = "B" 
                },
                new RiskDto 
                {
                    Amount = long.Parse(balanceSheets.AnnualReports.FirstOrDefault(x => x.FiscalDateEnding.Contains("2021")).LongTermDebt), 
                    Deadline = 10, 
                    Rating = "A" 
                },
                new RiskDto 
                {
                    Amount = long.Parse(balanceSheets.AnnualReports.FirstOrDefault(x => x.FiscalDateEnding.Contains("2021")).LongTermDebt), 
                    Deadline = 20, 
                    Rating = "B" 
                },
            };

            foreach (var item in risks)
            {
                item.Rating = GetCreditRisk(riskParams.MarketCap, desviacionEstandar, item.Deadline, item.Amount).ToString();
            }

            return risks;
        }

        private double GetStandardDeviation(StockData dailyData)
        {
            var closes = new List<double>();
            
            foreach (var date in dailyData.TimeSeriesDaily)
            {
                closes.Add((double)date.Value.Close);
            }

            // Calcula los rendimientos diarios
            List<double> rendimientosDiarios = new List<double>();
            for (int i = 1; i < closes.Count; i++)
            {
                double rendimiento = (closes[i] - closes[i - 1]) / closes[i - 1];
                rendimientosDiarios.Add(rendimiento);
            }

            // Calcula la desviación estándar de los rendimientos
            double desviacionEstandar = Math.Sqrt(rendimientosDiarios.Average(x => Math.Pow(x, 2)));

            return desviacionEstandar;
        }

        private async Task<ActionResult<StockData>> GetTimeSeriesDaily(string ticker, string apiKey) 
        {
            StringBuilder requestUrlBuilder = new StringBuilder($"/query?function=TIME_SERIES_DAILY&symbol={ticker}&apikey={apiKey}");

            var requestUrl = requestUrlBuilder.ToString();

            var httpClient = _httpClientFactory.CreateClient("AlphaVantageClient");
            var response = await httpClient.GetAsync(requestUrl);

            if (!response.IsSuccessStatusCode)
            {
                return BadRequest();
            }

            string responseBody = await response.Content.ReadAsStringAsync();

            if (string.IsNullOrEmpty(responseBody)) return BadRequest();

            var stockData = JsonConvert.DeserializeObject<StockData>(responseBody);

            return stockData;
        }

        private double GetCreditRisk(double marketCap, double standardDeviation, double periodTT, double debt)
        {
            double E0 = marketCap; // Valor de mercado Market Cap
            double se = standardDeviation; // Desviación estándar de rendimientos Desviacion estándar anterior  alpha (Datos alpha)
            double rf = 0.05; // Tasa libre de riesgo  datos estándar de 5.54% o 0.0554
            double TT = periodTT; // Tiempo de la deuda  Varia si es corta es de 1,2,3 años si es larga 10,20,30 años  alpha (Datos alpha)
            double D = debt; // Monto de la deuda la que saquemos de alpha (Datos alpha)

            Func<Vector<double>, double> eq24_3 = x =>
            {
                double V0 = x[0];
                double sv = x[1];

                double term1 = V0 * Normal.CDF(Math.Log(V0 / D), ((rf + Math.Pow(sv, 2) / 2) * TT), (sv * Math.Sqrt(TT)));
                double term2 = D * Math.Exp(-rf * TT) * Normal.CDF(
                    Math.Log(V0 / D),
                    ((rf + Math.Pow(sv, 2) / 2) * TT),
                    (sv * Math.Sqrt(TT)) - sv * Math.Sqrt(TT)
                );

                return Math.Pow(term1 - term2 - E0, 2);
            };

            Func<Vector<double>, double> eq24_4 = x =>
            {
                double V0 = x[0];
                double sv = x[1];

                double term1 = Normal.CDF(
                    Math.Log(V0 / D),
                    ((rf + Math.Pow(sv, 2) / 2) * TT),
                    (sv * Math.Sqrt(TT))
                );

                double term2 = sv * V0 - se * E0;

                return Math.Pow(term1 * term2, 2);
            };

            Func<Vector<double>, double> minFootnote10 = x =>
            {
                return Math.Pow(eq24_3(x), 2) + Math.Pow(eq24_4(x), 2);
            };

            var initialGuess = Vector<double>.Build.DenseOfArray(new double[] { 1, 1 });

            // Crear un optimizador Nelder-Mead
            var optimizer = new NelderMeadSimplex(0.0, 20000000); // El número 2 representa la cantidad de variables (V0 y sv)
            optimizer.ConvergenceTolerance = 1e-9;
            // Definir la función objetivo (minFootnote10)
            Func<Vector<double>, double> objectiveFunction = x =>
            {
                return minFootnote10(x);
            };

            // Encontrar el mínimo
            var result = optimizer.FindMinimum(ObjectiveFunction.Value(objectiveFunction), initialGuess);

            double V0 = result.MinimizingPoint[0];
            double sv = result.MinimizingPoint[1];

            double pd = 1 - Normal.CDF(
                -Math.Log(V0 / D),
                ((rf + Math.Pow(sv, 2) / 2) * TT) / (sv * Math.Sqrt(TT)),
                sv * Math.Sqrt(TT)
            );

            Console.WriteLine("PD: " + pd);

            return pd;
        }

        private async Task<ActionResult<AnnualReportsRoot>> GetAnnualReports
            (string ticker, string apiKey)
        {
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            
            string cacheKey = $"ANNUAL_REPORT_{ticker}";
            
            var cachedResponse = await _responseCacheService.GetCachedResponse(cacheKey);

            if (cachedResponse != null) {
                // there is a response
                // we need to return it
                // in the correct data type
                var balanceSheet = JsonConvert.DeserializeObject<AnnualReportsRoot>(cachedResponse.Response);
                
                return balanceSheet;
             }
            // there is no response
            // we need to fetch
            // we need to save it
            // then return it
            
            StringBuilder requestUrlBuilder = new StringBuilder($"/query?function=BALANCE_SHEET&symbol={ticker}&apikey={apiKey}");

            var requestUrl = requestUrlBuilder.ToString();

            var httpClient = _httpClientFactory.CreateClient("AlphaVantageClient");
            var response = await httpClient.GetAsync(requestUrl);

            if (!response.IsSuccessStatusCode)
            {
                return BadRequest();
            }

            string responseBody = await response.Content.ReadAsStringAsync();

            if (string.IsNullOrEmpty(responseBody)) return BadRequest();

            var stockData = JsonConvert.DeserializeObject<AnnualReportsRoot>(responseBody);

            var cachedRes = new CachedResponse
            {
                Response = System.Text.Json.JsonSerializer.Serialize(stockData, options),
            };

            await _responseCacheService.CacheResponseAsync(cacheKey, cachedRes, TimeSpan.FromHours(24));

            return stockData;
        }
    }
}