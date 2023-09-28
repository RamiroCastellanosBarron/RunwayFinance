namespace Core.Entities
{
    public class UserProfilePicture
    {
        public AppUser User { get; set; }
        public Guid UserId { get; set; }
        public Photo Photo { get; set; }
        public int PhotoId { get; set; }
    }
}