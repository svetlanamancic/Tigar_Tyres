using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(Policy = "HasRole")]
    public class TyreController : BaseApiController
    {
        public TyreController(IUnitOfWork unitOfWork, IMapper mapper) 
            : base(unitOfWork, mapper)
        { 
        }

        [Authorize(Policy = "AdminRole")]
        [HttpGet]
        public async Task<ActionResult<PagedList<TyreDTO>>> GetTyres([FromQuery] UserParams userParams) 
        {
            var tyres = await _unitOfWork.TyreRepository.GetPagedAsync(userParams);

            Response.AddPaginationHeader(tyres.CurrentPage, 
                tyres.ItemsPerPage, tyres.TotalItems, tyres.TotalPages);

            return Ok(tyres);
        }

        [Authorize(Policy = "AdminRole")]
        [HttpPost("add")]
        public async Task<ActionResult<TyreDTO>> AddTyre([FromBody] TyreDTO tyreDto)
        {
            if (await _unitOfWork.TyreRepository.TyreExists(tyreDto.Code)) 
            {
                return BadRequest("Tyre code already registered.");
            }

            var tyre = new Tyre {
                Id = Guid.NewGuid().ToString(),
                Code = tyreDto.Code,
                Type = tyreDto.Type,
                Price = tyreDto.Price
            };

            _unitOfWork.TyreRepository.Add(tyre);

            if(await _unitOfWork.Complete()) return Ok(tyreDto);

            return BadRequest("Failed to register tyre record.");
        }

        [HttpGet("getRaw")] 
        public async Task<ActionResult<IEnumerable<TyreDTO>>> GetTyres(){
            
            var tyres = await _unitOfWork.TyreRepository.GetAllAsync();

            return Ok(tyres);
        }

    }
}