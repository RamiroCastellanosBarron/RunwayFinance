namespace Core.Helpers
{
    public class StockPricesBySecurityParams
    {
        public string Identifier { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Frequency { get; set; }
        public int? PageSize { get; set; } = 100;
        public string NextPage { get; set; } = null;
    }
}