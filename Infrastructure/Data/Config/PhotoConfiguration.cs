using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class PhotoConfiguration : IEntityTypeConfiguration<Photo>
    {
        public void Configure(EntityTypeBuilder<Photo> builder)
        {
            builder
                .HasOne(x => x.UserProfilePicture)
                .WithOne(x => x.Photo)
                .HasForeignKey<UserProfilePicture>(x => x.PhotoId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}