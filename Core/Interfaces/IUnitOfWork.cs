namespace Core.Interfaces
{
    public interface IUnitOfWork
    {
        Task<int> Complete();
        bool HasChanges();
        IPhotoRepository PhotoRepository { get; }
        IUserProfilePictureRepository UserProfilePictureRepository { get; }
    }
}