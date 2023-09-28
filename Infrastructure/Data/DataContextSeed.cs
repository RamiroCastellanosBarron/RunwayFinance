using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class DataContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var roles = new List<AppRole>()
            {
                new AppRole { Name = "Admin" },
                new AppRole { Name = "Member" },
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            var admin = new AppUser 
            {
                Email = "ramiro@castellanosbarron.com",
                UserName = "ramiro@castellanosbarron.com",
                Sex = "Masculino",
                FirstName = "Ramiro",
                LastName = "Castellanos",
                DateOfBirth = new DateOnly(2000, 05, 02),
            };

            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, new string[] {"Admin", "Member"});

            var users = new List<AppUser>()
            {
                new AppUser
                {
                    FirstName = "Hernán", LastName = "González", Email = "hernan.gonzaleza@udem.edu",
                    Sex = "Masculino", UserName = "hernan.gonzaleza@udem.edu"
                },
                new AppUser
                {
                    FirstName = "Martín", LastName = "Lozano", Email = "martin.lozano@udem.edu",
                    Sex = "Masculino", UserName = "martin.lozano@udem.edu"
                },
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");

                await userManager.AddToRolesAsync(user, new string[] {"Member"});
            }
        }

        // public static async Task SeedDataContextAsync(DataContext context)
        // {

        // }
    }
}