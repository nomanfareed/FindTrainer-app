using AutoMapper;
using FindTrainer.Application.Dtos;
using FindTrainer.Application.Dtos.UserMessage;
using FindTrainer.Domain.Entities;
using FindTrainer.Domain.Entities.Security;
using System.Linq;

namespace FindTrainer.Application
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            //Users
            CreateMap<ApplicationUser, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Photo.Url);
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
            CreateMap<UserDefaultIntakeDto, ApplicationUser>()
            .ForMember(dest => dest.Address, opt =>
            {
                opt.MapFrom(src => new Address { City = src.City, Country = src.Country, Province = src.Province, FullAddress = src.Address });
            })
                  .ForMember(dest => dest.ApplicationUserFocuses, opt =>
                  {
                      opt.MapFrom(d => d.Focus.Select(x => new Focus { Name = x }));
                  })
                .ForMember(dest => dest.Gender, opt =>
                {
                    opt.MapFrom(s => s.Gender.ToLower() == "male" ? 2 : s.Gender.ToLower() == "female" ? 1 : 3);
                });
            CreateMap<UserForRegisterDto, ApplicationUser>()
                .ForMember(dest => dest.Address, opt =>
                {
                    opt.MapFrom(src => new Address { City = src.City, Country = src.Country, Province = src.Province, FullAddress = src.Address });
                })
             .ForMember(dest => dest.ApplicationUserFocuses, opt =>
             {
                 opt.MapFrom(d => d.Focus.Select(x => new Focus { Name = x }));
             })
           .ForMember(dest => dest.Gender, opt =>
           {
               opt.MapFrom(s => s.Gender.ToString().ToLower() == "male" ? 2 : s.Gender.ToString().ToLower() == "female" ? 1 : 3);
           });
            CreateMap<ApplicationUser, UserForDetailedDto>()
                  .ForMember(dest => dest.AvgStar, opt =>
                  {
                      opt.MapFrom(d => d.ReviewsReceived.Count() == 0 ? 0 : d.ReviewsReceived.Average(x => x.Stars));
                  })
                 .ForMember(dest => dest.Focus, opt =>
                 {
                     opt.MapFrom(d => d.ApplicationUserFocuses.Select(x => new Focus() {Id = x.FocusId}));
                 })
                .ForMember(dest => dest.TotalStars, opt =>
                {
                    opt.MapFrom(d => d.ReviewsReceived.Count());
                })
                .ForMember(dest => dest.Gender, opt =>
                {
                    opt.MapFrom(d => d.Gender.ToString());
                });

            CreateMap<UserForDetailedDto, ApplicationUser>();

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
            CreateMap<CertificationForCreationDto, Certification>()
                                  .ForMember(dest => dest.Created, opt => opt.Ignore());
            CreateMap<Certification, CertificationForReturnDto>();

            #region userMessages

            CreateMap<UserMessage, UserMessagesDto>()
                                  .ForMember(dest => dest.CreateDateTime, opt =>
                                  {
                                      opt.MapFrom(d => d.CreateDateTime.ToString("yyyy/MM/ddTHH:mm"));
                                  })
                                  .ForMember(dest => dest.IsRead, opt =>
                                  {
                                      opt.MapFrom(d => d.VisiteDateTime != null ? true : false);
                                  })
                                  .ForMember(dest => dest.TrainerName, opt =>
                                  {
                                      opt.MapFrom(d => d.Trainer.KnownAs);
                                  });

            CreateMap<UserMessage, TrainerMessagesDto>()
                                  .ForMember(dest => dest.CreateDateTime, opt =>
                                  {
                                      opt.MapFrom(d => d.CreateDateTime.ToString("yyyy/MM/ddTHH:mm"));
                                  })
                                  .ForMember(dest => dest.IsNew, opt =>
                                  {
                                      opt.MapFrom(d => d.VisiteDateTime == null ? true : false);
                                  })
                                  .ForMember(dest => dest.UserName, opt =>
                                  {
                                      opt.MapFrom(d => d.User.KnownAs);
                                  });
            #endregion
        }
    }
}
