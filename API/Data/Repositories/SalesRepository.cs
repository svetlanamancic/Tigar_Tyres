using System;
using System.Collections.Generic;
using System.Linq;
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
    public class SalesRepository : BaseRepository<Sales,SalesDTO>, ISalesRepository
    {
        // private readonly DataContext _context;
        // private readonly IMapper _mapper;

        public SalesRepository(DataContext context, IMapper mapper) 
            :base(context, mapper)
        {
            // _context = context;
            // _mapper = mapper;
        }

        public async Task<Sales> GetSaleAsync(string id)
        {
            return await _context.Sales.Where(x => x.Id == id)
                .Include(x => x.Production)
                .SingleOrDefaultAsync();
        }

    }
}