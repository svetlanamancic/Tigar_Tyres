using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        public BuggyController(IUnitOfWork unitOfWork, IMapper mapper) 
            : base(unitOfWork, mapper)
        {
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret() 
        {
            return "secret text";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> NotFound() 
        {
            var thing = _unitOfWork.UserRepository.GetUser("-1");

            if(thing == null) return NotFound(thing);

            return Ok(thing);
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError() 
        {
            try 
            {
                var thing = _unitOfWork.UserRepository.GetUser("-1");

                var thingToReturn = thing.ToString();

                return thingToReturn;
            }
            catch (Exception e) 
            {
                return StatusCode(500, "Computer says no");
            }
            
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest() 
        {
            return BadRequest("this was not a good request");
        }
    }
}