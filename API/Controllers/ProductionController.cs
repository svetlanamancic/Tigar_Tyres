using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using API.Interfaces;
using API.Helpers;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize(Policy = "HasRole")]
    public class ProductionController : BaseApiController
    {
        public ProductionController(IUnitOfWork unitOfWork, IMapper mapper) 
            : base(unitOfWork, mapper)
        { 
        }

        [HttpGet] 
        public async Task<ActionResult<PagedList<ProductionDTO>>> GetProductionRecords([FromQuery]UserParams userParams)
        { 
            //get user role from claims
            var role = User.GetUserRole(); 

            //if user role is operator add to filter params to return only his prod records
            if(role == "Production Operator")
            {
                userParams.Operator = User.GetUsername();
            }
            
            //get paginated result
            var prod = await _unitOfWork.ProductionRepository.GetPagedAsync(userParams);

            Response.AddPaginationHeader(prod.CurrentPage, prod.ItemsPerPage, 
                prod.TotalItems, prod.TotalPages);   
            
            return Ok(prod);

        }

        [Authorize(Policy = "AddProduction")]
        [HttpPost("add")]
        public async Task<ActionResult<ProductionDTO>> AddProductionRecord(ProductionDTO prodRecord)
        {
            //get user who's adding production
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            //get machine and tyre for production
            var machine = await _unitOfWork.MachineRepository.GetMachineAsync(prodRecord.Machine);

            if (machine == null) 
            {
                return BadRequest("Chosen machine does not exits.");
            }
            
            var tyre = await _unitOfWork.TyreRepository.GetTyreAsync(prodRecord.Tyre);

            if (tyre == null)
            {
                return BadRequest("Chosen tyre does not exits.");   
            }

            //check if record exists before adding - shift, machine, tyre code combination
            var prod = await _unitOfWork.ProductionRepository
                .Exists(prodRecord.Shift, prodRecord.Machine, prodRecord.Tyre);

            //if production record for chosen shift, machine, tyre exists --- dont add
            if(prod != null) 
            {
                return BadRequest("Production record for chosen shift, machine and tyre exists.");
            }

            //set production properties --- use mapper
            var production = new Production
            {
                Id = Guid.NewGuid().ToString(),
                ProductionDate = DateOnly.FromDateTime(DateTime.Now),
                Quantity = prodRecord.Quantity,
                Shift = prodRecord.Shift,
                Operator = user,
                Machine = machine,
                Tyre = tyre
            };
            
            //save new production
            _unitOfWork.ProductionRepository.Add(production);

            if (await _unitOfWork.Complete()) return Ok(_mapper.Map<ProductionDTO>(production));

            return BadRequest("Failed to add production record.");

        }

        [Authorize(Policy = "UpdateDelete")]
        [HttpPut("update")]
        public async Task<ActionResult<ProductionDTO>> UpdateProduction(UpdateProductionDTO productionDTO) 
        {
            //get user who is sending request and add him in action trail and set modified flag to true
            var prod = await _unitOfWork.ProductionRepository.GetProductionAsync(productionDTO.Id);

            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            //update production atributes --- use mapper for this
            prod.Quantity = productionDTO.Quantity;
            prod.Shift = productionDTO.Shift;
            prod.ModifiedFlag = true;
            prod.Modifier = user;
            prod.DateModified = DateTime.Now;

            if (prod.Machine.Name != productionDTO.Machine)
            {
                prod.Machine = await _unitOfWork.MachineRepository.GetMachineAsync(productionDTO.Machine);
            }
            if (prod.Tyre.Code != productionDTO.Tyre)
            {
                prod.Tyre = await _unitOfWork.TyreRepository.GetTyreAsync(productionDTO.Tyre);
            }
            
            //update production
            _unitOfWork.ProductionRepository.Update(prod);

            if(await _unitOfWork.Complete()) return Ok(_mapper.Map<ProductionDTO>(prod));

            return BadRequest("Failed to update production record.");
        }

        [HttpGet("getRaw")] 
        public async Task<ActionResult<IEnumerable<ProductionDTO>>> GetProductions()
        {
            
            var prods = await _unitOfWork.ProductionRepository.GetAllAsync();

            return Ok(prods);
        
        }

        [Authorize(Policy = "UpdateDelete")]
        [Route("delete/{id}")]
        [HttpDelete]
        public async Task<ActionResult> Delete(string id)
        {
            //get operator, machine, modifier and tyre and remove
            var production = await _unitOfWork.ProductionRepository.GetProductionAsync(id);

            if(production == null) return NotFound();

            //if sale record exists for producton, dont delete
            if(production.SalesRecordId != null) return BadRequest("Already sold, not able to delete production record.");

            var user = await _unitOfWork.UserRepository.GetUserAsync(production.OperatorId);
            var tyre = await _unitOfWork.TyreRepository.GetTyreAsync(production.Tyre.Code);
            var machine = await _unitOfWork.MachineRepository.GetMachineAsync(production.Machine.Name);

            if(production.ModifiedFlag)
            {
                var modifier = await _unitOfWork.UserRepository.GetUserAsync(production.ModifierId);
                modifier.ModifiedProductions.Remove(production);
            }

            //remove production
            user.Productions.Remove(production);
            tyre.Productions.Remove(production);
            machine.ProductionRecords.Remove(production);

            if(await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to delete production.");
        }

    }
}