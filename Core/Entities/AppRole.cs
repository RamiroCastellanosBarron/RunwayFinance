using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class AppRole : IdentityRole<Guid>
    {
        public List<AppUserRole> UserRoles { get; set; } = new List<AppUserRole>();
    }
}