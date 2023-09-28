namespace Core.Entities
{
    public class Photo : BaseEntity
    {
        public string Url { get; set; }
        public string PublicId { get; set; }
        public string Name { get; set; }
        public int Size { get; set; }
        public UserProfilePicture UserProfilePicture { get; set; }
    }
}