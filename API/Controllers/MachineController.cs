using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using API.Entities;
using API.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class MachineController : BaseApiController
    {
        public MachineController(IUnitOfWork unitOfWork, IMapper mapper)
            : base(unitOfWork, mapper)
        { 
        }

        [Authorize(Policy = "AdminRole")]
        [HttpGet]
        public async Task<ActionResult<PagedList<Machine>>> GetMachines([FromQuery] UserParams userParams) 
        {
            var machines = await _unitOfWork.MachineRepository.GetPagedAsync(userParams);

            Response.AddPaginationHeader(machines.CurrentPage, 
                machines.ItemsPerPage, machines.TotalItems, machines.TotalPages);

            return Ok(machines);
        }

        [Authorize(Policy = "AdminRole")]
        [HttpPost("add")]
        public async Task<ActionResult<MachineDTO>> AddMachine([FromBody] MachineDTO machineDto)
        {
            if (await _unitOfWork.MachineRepository.MachineExists(machineDto.Name)) 
            {
                return BadRequest("Machine already registered.");
            }

            var machine = new Machine {
                Id = Guid.NewGuid().ToString(),
                Name = machineDto.Name,
                Location = machineDto.Location
            };

            _unitOfWork.MachineRepository.Add(machine);

            if(await _unitOfWork.Complete()) return Ok(machineDto);

            return BadRequest("Failed to register new machine.");
        }

        [Authorize(Policy = "HasRole")]
        [HttpGet("getRaw")] 
        public async Task<ActionResult<IEnumerable<MachineDTO>>> GetMachines(){
            
            var machines = await _unitOfWork.MachineRepository.GetAllAsync();

            return Ok(machines);
        }
    }
}