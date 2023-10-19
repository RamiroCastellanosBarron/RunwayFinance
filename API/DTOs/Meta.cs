namespace API.DTOs
{
    public class Meta
    {
        public string PermaTicker { get; set; }
        public string Ticker { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public bool IsADR { get; set; }
        public string Sector { get; set; }
        public string Industry { get; set; }
        public int SicCode { get; set; }
        public string SicSector { get; set; }
        public string SicIndustry { get; set; }
        public string ReportingCurrency { get; set; }
        public string Location { get; set; }
        public string CompanyWebsite { get; set; }
        public string SecFilingWebsite { get; set; }
        public DateTimeOffset StatementLastUpdated { get; set; }
        public DateTimeOffset DailyLastUpdated { get; set; }
        public string DataProviderPermaTicker { get; set; }
    }
}