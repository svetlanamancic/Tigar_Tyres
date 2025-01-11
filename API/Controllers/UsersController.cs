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
    public class UsersController : BaseApiController
    {        
        public UsersController(IUnitOfWork unitOfWork, IMapper mapper) 
            : base(unitOfWork, mapper)
        { 
        }


        [Authorize(Policy = "AdminRole")]
        [HttpGet]
        public async Task<ActionResult<PagedList<ProfileDTO>>> GetPagedUsers([FromQuery]UserParams userParams)
        {
            var users = await _unitOfWork.UserRepository.GetPagedAsync(userParams);

            Response.AddPaginationHeader(users.CurrentPage, users.ItemsPerPage, 
                users.TotalItems, users.TotalPages);

            return Ok(users);
        }

        [HttpGet("getRaw")]
        public async Task<ActionResult<IEnumerable<ProfileDTO>>> GetUsers()
        {
            var users = await _unitOfWork.UserRepository.GetAllAsync();

            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<ProfileDTO>> GetUser(string username)
        {
            var user = await _unitOfWork.UserRepository.GetProfileByUsernameAsync(username);
            return user;

        }
    }
}