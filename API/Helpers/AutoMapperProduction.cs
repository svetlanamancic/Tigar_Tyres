using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProduction : Profile
    {
        public AutoMapperProduction()
        {
            CreateMap<Production, ProductionDTO>()
                .ForMember(dest => dest.Machine, opt => opt.MapFrom(src => src.Machine.Name))
                .ForMember(dest => dest.Operator, opt => opt.MapFrom(src => src.Operator.UserName))
                .ForMember(dest => dest.Tyre, opt => opt.MapFrom(src => src.Tyre.Code))
                .ForMember(dest => dest.Modifier, opt => opt.MapFrom(src => src.Modifier.UserName))
                .ForMember(dest => dest.Sale, opt => opt.MapFrom(src => src.SalesRecordId));

            CreateMap<AppUser, ProfileDTO>()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.Name))
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.UserName));

            CreateMap<Tyre, TyreDTO>();

            CreateMap<Machine, MachineDTO>();

            CreateMap<Sales,SalesDTO>()
                .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Production.Quantity))
                .ForMember(dest => dest.Supervisor, opt => opt.MapFrom(src => src.Supervisor.UserName))
                .ForMember(dest => dest.Tyre, opt => opt.MapFrom(src => src.Tyre.Code))
                .ForMember(dest => dest.Production, opt => opt.MapFrom(src => src.ProductionId))
                .ForMember(dest => dest.Modifier, opt => opt.MapFrom(src => src.Modifier.UserName));
                

        }
    }
}