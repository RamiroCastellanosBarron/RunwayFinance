using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhotoRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void Add(Photo photo)
        {
            _context.Photos.Add(photo);
        }

        public void Delete(Photo photo)
        {
            _context.Photos.Remove(photo);
        }

        public async Task<Photo> GetByIdAsync(int id)
        {
            return await _context.Photos
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Photo> GetPhotoByUserIdAsync(Guid userId)
        {
            return await _context.Photos
                .Include(x => x.UserProfilePicture)
                .FirstOrDefaultAsync(x => x.UserProfilePicture.UserId == userId);
        }
    }
}