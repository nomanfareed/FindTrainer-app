using System.Linq;
using AutoMapper;
using API.Dtos;
using API.Models;
using DatingApp.API.Dtos;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //Users
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Profile.Url);
                })
                .ForMember(dest => dest.AvgStar, opt =>
                {
                    opt.MapFrom(d => d.ReviewsReceived.Count() == 0 ? 0 : d.ReviewsReceived.Average(x => x.Stars));
                })
                .ForMember(dest => dest.TotalStars, opt =>
                {
                    opt.MapFrom(d => d.ReviewsReceived.Count());
                })
                .ForMember(dest => dest.Gender, opt =>
                {
                    opt.MapFrom(d => d.Gender.ToString());
                });
            CreateMap<UserDefaultIntakeDto, User>()
            .ForMember(dest => dest.Address, opt =>
                {
                    opt.MapFrom(src => new Address { City = src.City, Country = src.Country, Province = src.Province, FullAddress = src.Address });
                })
                  .ForMember(dest => dest.Focus, opt =>
                {
                    opt.MapFrom(d => d.Focus.Select(x => new Focus { Name = x }));
                })
                .ForMember(dest => dest.Gender, opt =>
                {
                    opt.MapFrom(s => s.Gender.ToLower() == "male" ? 2 : s.Gender.ToLower() == "female" ? 1 : 3);
                });
            CreateMap<UserForRegisterDto, User>()
                .ForMember(dest => dest.Address, opt =>
           {
               opt.MapFrom(src => new Address { City = src.City, Country = src.Country, Province = src.Province, FullAddress = src.Address });
           })
             .ForMember(dest => dest.Focus, opt =>
           {
               opt.MapFrom(d => d.Focus.Select(x => new Focus { Name = x }));
           })
           .ForMember(dest => dest.Gender, opt =>
           {
               opt.MapFrom(s => s.Gender.ToLower() == "male" ? 2 : s.Gender.ToLower() == "female" ? 1 : 3);
           });
            CreateMap<User, UserForDetailedDto>()
                  .ForMember(dest => dest.AvgStar, opt =>
                {
                    opt.MapFrom(d => d.ReviewsReceived.Count() == 0 ? 0 : d.ReviewsReceived.Average(x => x.Stars));
                })
                 .ForMember(dest => dest.Focus, opt =>
                {
                    opt.MapFrom(d => d.Focus.Select(x => x.Name));
                })
                .ForMember(dest => dest.TotalStars, opt =>
                {
                    opt.MapFrom(d => d.ReviewsReceived.Count());
                })
                .ForMember(dest => dest.Gender, opt =>
                {
                    opt.MapFrom(d => d.Gender.ToString());
                });

            CreateMap<UserForDetailedDto, User>();

            //Address
            CreateMap<Address, AddressToReturnDto>();
            CreateMap<AddressForCreation, Address>();

            //Photo
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<Photo, PhotoForReturnDto>();

            //Reviews
            CreateMap<Review, ReviewForListDto>()
                .ForMember(dest => dest.SenderName, opt =>
                {
                    opt.MapFrom(src => src.Sender.KnownAs);
                });

            //Certification
            CreateMap<CertificationForCreationDto, Certification>();
            CreateMap<Certification, CertificationForReturnDto>();
        }
    }
}