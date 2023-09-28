using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class UserProfilePictureRepository : IUserProfilePictureRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserProfilePictureRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public void Add(UserProfilePicture userProfilePicture)
        {
            _context.UserProfilePictures.Add(userProfilePicture);
        }

        public void Delete(UserProfilePicture userProfilePicture)
        {
            _context.UserProfilePictures.Remove(userProfilePicture);
        }

        public async Task<UserProfilePicture> GetByUserIdAsync(Guid userId)
        {
            return await _context.UserProfilePictures
                .FirstOrDefaultAsync(up => up.UserId == userId);
        }
    }
}