using AutoMapper;
using Core.Interfaces;

namespace Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UnitOfWork(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public IPhotoRepository PhotoRepository => new PhotoRepository(_context, _mapper);
        public IUserProfilePictureRepository UserProfilePictureRepository => new UserProfilePictureRepository(_context, _mapper);

        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}