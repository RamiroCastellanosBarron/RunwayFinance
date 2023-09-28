using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class UserProfilePictureConfiguration : IEntityTypeConfiguration<UserProfilePicture>
    {
        public void Configure(EntityTypeBuilder<UserProfilePicture> builder)
        {
            builder
                .HasKey(x => new {
                    x.UserId,
                    x.PhotoId
                });

            builder
                .HasOne(x => x.User)
                .WithOne(x => x.UserProfilePicture)
                .HasForeignKey<UserProfilePicture>(x => x.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(x => x.Photo)
                .WithOne(x => x.UserProfilePicture)
                .HasForeignKey<UserProfilePicture>(x => x.PhotoId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}