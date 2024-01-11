using AutoMapper;
using testMongo.Dto;
using testMongo.Models;

namespace testMongo.Profiles
{
    public class StylesProfiles : Profile
    {
        public StylesProfiles() {
            CreateMap<StylesDto, Style>();
            CreateMap<Style, StylesDto>();
        }
    }
}
