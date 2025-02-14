using System.Net.WebSockets;
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
    public class SalesController : BaseApiController
    {

        public SalesController(IUnitOfWork unitOfWork, IMapper mapper) 
            : base(unitOfWork, mapper)
        {
        }
        
        [Authorize(Policy = "ViewSalesPolicy")]
        [HttpGet]
        public async Task<ActionResult<PagedList<SalesDTO>>> GetSales([FromQuery]UserParams userParams)
        {
            //get paginated list
            var sales = await _unitOfWork.SalesRepository.GetPagedAsync(userParams);

            //set pagination header
            Response.AddPaginationHeader(sales.CurrentPage,sales.ItemsPerPage,
                sales.TotalItems,sales.TotalPages);

            return Ok(sales);
        }

        [Authorize(Policy = "QualitySupervisorRole")]
        [HttpPost("add")]
        public async Task<ActionResult<SalesDTO>> AddSaleRecord(RegisterSaleDTO saleDTO)
        {
            //get user from claims
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var prod = await _unitOfWork.ProductionRepository.GetProductionAsync(saleDTO.Production);

            if (prod == null)
            {
                return BadRequest("Production record doesn't exist.");
            }

            //map sale properties
            var sale = new Sales{
                Id = Guid.NewGuid().ToString(),
                Quantity = prod.Quantity,
                Price = prod.Tyre.Price,
                DestinationMarket = saleDTO.DestinationMarket,
                PurchasingCompany = saleDTO.PurchasingCompany,
                SaleDate = DateTime.Now,
                Production = prod,
                Tyre = prod.Tyre,
                Supervisor = user
            };

            _unitOfWork.SalesRepository.Add(sale);

            if (await _unitOfWork.Complete()) {
                            
                //update production entity with sale record
                prod.SalesRecord = sale;
                prod.SalesRecordId = sale.Id;

                _unitOfWork.ProductionRepository.Update(prod);

                if (await _unitOfWork.Complete()) return Ok(_mapper.Map<SalesDTO>(sale));

            } 

            return BadRequest("Failed to add sale record.");
        }
        
        [Authorize(Policy = "UpdateDelete")]
        [HttpPut("update")]
        public async Task<ActionResult<SalesDTO>> Update(UpdateSalesDTO salesDTO)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var sale =  await _unitOfWork.SalesRepository.GetSaleAsync(salesDTO.Id);

            //update sales
            sale.PurchasingCompany = salesDTO.PurchasingCompany;
            sale.DestinationMarket = salesDTO.DestinationMarket;
            sale.ModifiedFlag = true;
            sale.DateModified = DateTime.UtcNow;
            sale.Modifier = user;

            //update production properties if production changed
            if ( sale.ProductionId != salesDTO.Production) 
            {
                var oldProd = await _unitOfWork.ProductionRepository
                    .GetProductionAsync(sale.ProductionId);

                oldProd.SalesRecord = null;
                oldProd.SalesRecordId = null;

                _unitOfWork.ProductionRepository.Update(oldProd);

                var newProd = await _unitOfWork.ProductionRepository
                    .GetProductionAsync(salesDTO.Production);
                
                newProd.SalesRecord = sale;
                newProd.SalesRecordId = sale.Id;

                _unitOfWork.ProductionRepository.Update(newProd);

                sale.Production = newProd;
                sale.ProductionId = newProd.Id;
                sale.Quantity = newProd.Quantity;
                sale.Price = newProd.Tyre.Price;
                sale.Tyre = newProd.Tyre;
            }

            _unitOfWork.SalesRepository.Update(sale);

            if(await _unitOfWork.Complete()) return Ok(_mapper.Map<SalesDTO>(sale));

            return BadRequest("Failed to update sales record.");

        }

        [Authorize(Policy = "UpdateDelete")]
        [Route("delete/{id}")]
        [HttpDelete]
        public async Task<ActionResult> Delete(string id)
        {
            //get supervisor, production, modifier and tyre and remove from the lists
            var sale = await _unitOfWork.SalesRepository.GetSaleAsync(id);

            if(sale == null) return NotFound();

            var supervisor = await _unitOfWork.UserRepository.GetUserAsync(sale.SupervisorId);
            var production = await _unitOfWork.ProductionRepository.GetProductionAsync(sale.ProductionId);
            var tyre = await _unitOfWork.TyreRepository.GetTyreAsync(sale.Tyre.Code);
            
            if(sale.ModifiedFlag)
            {
                var modifier = await _unitOfWork.UserRepository.GetUserAsync(sale.ModifierId);
                modifier.SalesModified.Remove(sale);
            }

            supervisor.Sales.Remove(sale);
            production.SalesRecord = null;
            production.SalesRecordId = null;
            tyre.Sales.Remove(sale);

            if(await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to delete sale.");
        }





    }
}