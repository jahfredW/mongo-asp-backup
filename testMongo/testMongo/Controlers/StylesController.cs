using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using testMongo.Dto;
using testMongo.Models;
using testMongo.Services;

namespace testMongo.Controlers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StylesController : ControllerBase
    {
        private readonly StylesService _StylesService;
        private readonly IMapper _mapper;

        public StylesController(StylesService service, IMapper mapper)
        {
            _StylesService = service;
            _mapper = mapper;


        }

        [HttpGet]
        public async Task<ActionResult<StylesDto>> Get()
        {
            var listeStyles = await _StylesService.GetAsync();
            var styles = _mapper.Map<StylesDto>(listeStyles);
            return Ok(styles);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateStyle(Style entity)
        {
            var StyleFromRepo = await _StylesService.GetAsync();

            if (StyleFromRepo == null)
            {
                return NotFound();
            }

            entity.Id = StyleFromRepo.Id ;

            StyleFromRepo.Styles = entity.Styles;

            await _StylesService.UpdateAsync(StyleFromRepo.Id ,StyleFromRepo);
            return NoContent();
        }
    }
}