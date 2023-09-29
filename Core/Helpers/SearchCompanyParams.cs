namespace Core.Helpers
{
    public class SearchCompanyParams : PaginationParams
    {
        private string _search;
        public string Search
        {
            get => _search;
            set => _search = value.ToLower();
        }
        public bool IsActive { get; set; }
    }
}