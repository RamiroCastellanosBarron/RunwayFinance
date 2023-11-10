namespace API.DTOs
{
    public class SearchDto
    {
        public string Name { get; set; }
        public string Ticker { get; set; }
        public string PermaTicker { get; set; }
        public string OpenFIGIComposite { get; set; }
        public string AssetType { get; set; }
        public bool IsActive { get; set; }
        public string CountryCode { get; set; }
    }
}