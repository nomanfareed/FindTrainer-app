using AutoMapper;
using FindTrainer.Application.Dtos;
using FindTrainer.Domain.Entities;

namespace FindTrainer.Application
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<CertificationForCreationDto, Certification>();
            CreateMap<Certification, CertificationForReturnDto>();

            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<Photo, PhotoForReturnDto>();
        }
    }
}
