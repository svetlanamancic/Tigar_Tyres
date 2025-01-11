using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class TyreRepository : BaseRepository<Tyre,TyreDTO>,ITyreRepository
    {
        // private readonly DataContext _context;
        // private readonly IMapper _mapper;

        public TyreRepository(DataContext context, IMapper mapper): base(context,mapper)
        {
            // _context = context;
            // _mapper = mapper;
        }

        public async Task<Tyre> GetTyreAsync(string tyre)
        {
            return await _context.Tyres.SingleOrDefaultAsync(x => x.Code == tyre);
        }

        public async Task<bool> TyreExists(string code)
        {
            return await _context.Tyres.AnyAsync(x => x.Code == code);
        }

    }
}