using AutoMapper;
using FindTrainer.Application.Dtos;
using FindTrainer.Domain.Entities;
using FindTrainer.Domain.Entities.Security;

namespace FindTrainer.Application
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<UserForDetailedDto, ApplicationUser>();

            //Address
            CreateMap<Address, AddressToReturnDto>();
            CreateMap<AddressForCreation, Address>();

            //Photo
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<Photo, PhotoForReturnDto>();

            //Certification
            CreateMap<CertificationForCreationDto, Certification>();
            CreateMap<Certification, CertificationForReturnDto>();
        }
    }
}
