using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : BaseRepository<AppUser,ProfileDTO>, IUserRepository
    {
        // private readonly DataContext _context;
        // private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
            :base(context, mapper)
        {
            // _context = context;
            // _mapper = mapper;
        }

        public async Task<ProfileDTO> GetProfileByUsernameAsync(string username)
        {
            return await _context.Users.Where(x => x.UserName == username)
                .ProjectTo<ProfileDTO>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }
        
        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<AppUser> GetUserAsync(string? id) 
        {
            return await _context.Users.Where(x => x.Id==id)
                .Include(x => x.Sales)
                .Include(x => x.Productions)
                .Include(x => x.SalesModified)
                .Include(x => x.ModifiedProductions)
                .SingleOrDefaultAsync();
                
        }

        public override async Task<IEnumerable<ProfileDTO>> GetAllAsync() 
        {
            return await _context.Users.Include(x => x.Productions).Include(x => x.Role)
                .Where(x => x.Productions.Count > 0 || x.Role.Name == "Production Operator")
                .ProjectTo<ProfileDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public AppUser GetUser(string id)
        {
            return _context.Users.Find(id);
        }
    }
}