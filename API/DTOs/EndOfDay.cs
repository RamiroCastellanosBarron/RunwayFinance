namespace API.DTOs
{
    public class EndOfDay
    {
        public double AdjClose { get; set; }
        public double AdjHigh { get; set; }
        public double AdjLow { get; set; }
        public double AdjOpen { get; set; }
        public long AdjVolume { get; set; }
        public double Close { get; set; }
        public DateTime Date { get; set; }
        public double DivCash { get; set; }
        public double High { get; set; }
        public double Low { get; set; }
        public double Open { get; set; }
        public double SplitFactor { get; set; }
        public long Volume { get; set; }
    }
}