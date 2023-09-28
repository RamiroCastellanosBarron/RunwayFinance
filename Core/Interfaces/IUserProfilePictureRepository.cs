using Core.Entities;

namespace Core.Interfaces
{
    public interface IUserProfilePictureRepository
    {
        void Add(UserProfilePicture userProfilePicture);
        void Delete(UserProfilePicture userProfilePicture);
        Task<UserProfilePicture> GetByUserIdAsync(Guid userId);
    }
}