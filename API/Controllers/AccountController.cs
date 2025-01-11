using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;

        private readonly SignInManager<AppUser> _signInManager;

        private readonly RoleManager<AppRole> _roleManager;

        private readonly ITokenService _tokenService;

        public AccountController(IUnitOfWork unitOfWork, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager,
            SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper) 
            : base(unitOfWork, mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _roleManager = roleManager;
        }

        [Authorize(Policy = "AdminRole")]
        [HttpPost("register")]
        public async Task<ActionResult<ProfileDTO>> Register(RegisterDTO registerDTO)
        {
            if (await UserExists(registerDTO.Username)) return BadRequest("Username is taken");

            var role = await _roleManager.FindByNameAsync(registerDTO.Role);

            if (role == null) return BadRequest("Role doesn't exist"); 

            var user = new AppUser{
                Id = Guid.NewGuid().ToString(),
                UserName = registerDTO.Username.ToLower(),
                FirstName = registerDTO.Firstname,
                LastName = registerDTO.Lastname,
                Role = role
            };

            var result =  await _userManager.CreateAsync(user, registerDTO.Password);
            
            if(!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, registerDTO.Role);

            if(!roleResult.Succeeded) return BadRequest(result.Errors);
    
            //change what is returned
            return new ProfileDTO
            {   
                Username=registerDTO.Username, 
                Firstname = registerDTO.Firstname,
                Lastname = registerDTO.Lastname
            };
        }


        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.Users.Include(x => x.Role)
                .SingleOrDefaultAsync(x => x.UserName == loginDTO.Username.ToLower());
                
            if (user == null) return Unauthorized("Invalid username");

            var result = await _signInManager
                .CheckPasswordSignInAsync(user, loginDTO.Password, false);

            if(!result.Succeeded) return Unauthorized();

            //change what is returned
            return new UserDTO
            {   
                Username=user.UserName, 
                Role = user.Role.Name,
                Token =  await _tokenService.CreateToken(user)
            };

        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}