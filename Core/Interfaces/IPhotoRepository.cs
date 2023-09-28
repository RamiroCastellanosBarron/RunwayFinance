using Core.Entities;

namespace Core.Interfaces
{
    public interface IPhotoRepository
    {
        void Add(Photo photo);
        void Delete(Photo photo);
        Task<Photo> GetByIdAsync(int id);
        Task<Photo> GetPhotoByUserIdAsync(Guid userId);
    }
}