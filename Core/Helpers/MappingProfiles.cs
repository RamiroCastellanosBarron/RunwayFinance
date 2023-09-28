using AutoMapper;
using Core.DTOs;
using Core.Entities;

namespace Core.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<AppUser, AccountDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.UserProfilePicture.Photo.Url));
        }
    }
}