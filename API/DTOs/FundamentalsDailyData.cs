namespace API.DTOs
{
    public class DailyData
    {
        public DateTimeOffset Date { get; set; }
        public double? MarketCap { get; set; }
        public double? EnterpriseVal { get; set; }
        public double? PeRatio { get; set; }
        public double? PbRatio { get; set; }
        public double? TrailingPEG1Y { get; set; }
    }
}