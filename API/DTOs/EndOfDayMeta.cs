namespace API.DTOs
{
    public class EndOfDayMeta
    {
        public string Ticker { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string ExchangeCode { get; set; }
    }
}