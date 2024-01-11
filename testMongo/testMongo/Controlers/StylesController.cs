using AutoMapper;
using testMongo.Services;

namespace testMongo.Controlers
{
    public class StylesController
    {
        private readonly StylesService _StylesService;
        private readonly IMapper _mapper;

        public StylesController(StylesService service, IMapper mapper)
        {
            _StylesService = service;
            _mapper = mapper;
        }
    }
}
