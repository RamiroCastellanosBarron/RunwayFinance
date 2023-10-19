namespace API.DTOs
{
    public class CompanyInfo
    {
        public string Ticker { get; set; }
        public DateTimeOffset? Timestamp { get; set; }
        public DateTimeOffset? LastSaleTimestamp { get; set; }
        public DateTimeOffset? QuoteTimestamp { get; set; }
        public double? Open { get; set; }
        public double? High { get; set; }
        public double? Low { get; set; }
        public double? Mid { get; set; }
        public double? TngoLast { get; set; }
        public double? Last { get; set; }
        public int? LastSize { get; set; }
        public int? BidSize { get; set; }
        public double? BidPrice { get; set; }
        public double? AskPrice { get; set; }
        public int? AskSize { get; set; }
        public double? PrevClose { get; set; }
        public int? Volume { get; set; }
    }
}