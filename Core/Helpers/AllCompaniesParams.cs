namespace Core.Helpers
{
    public class AllCompaniesParams : PaginationParams
    {
        public DateTime? LatestFilingDate { get; set;} = null;
        public string Sic { get; set;} = null;
        public string Template { get; set;} = null;
        public string Sector { get; set;} = null;
        public string IndustryCategory { get; set;} = null;
        public string IndustryGroup { get; set;} = null;
        public bool? HasFundamentals { get; set;} = true;
        public bool? HasStockPrices { get; set;} = true;
        public bool? TheaEnabled { get; set;} = null;
        public string NextPage { get; set;} = null;
    }
}