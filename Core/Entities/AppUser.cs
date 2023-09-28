using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class AppUser : IdentityUser<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Sex { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public List<AppUserRole> UserRoles { get; set; } = new List<AppUserRole>();
        public UserProfilePicture UserProfilePicture { get; set; }
    }
}