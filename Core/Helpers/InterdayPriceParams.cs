namespace Core.Helpers
{
    public class InterdayPriceParams
    {
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
        public string RequestFreq { get; set; }
    }
}