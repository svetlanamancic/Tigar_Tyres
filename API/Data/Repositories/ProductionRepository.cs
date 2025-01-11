using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Entities;
using API.DTOs;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using API.Helpers;

namespace API.Data
{
    public class ProductionRepository: BaseRepository<Production,ProductionDTO>,
         IProductionRepository
    {
        // private readonly DataContext _context;

        // private readonly IMapper _mapper;

        public ProductionRepository(DataContext context, IMapper mapper)
            : base(context, mapper)
        {
            // _context = context;
            // _mapper = mapper; 
        }

        public async Task<Production> GetProductionAsync(string id) 
        {
            return await _context.Productions.Where(x=> x.Id==id)
                .Include(x => x.Machine)
                .Include(x => x.Tyre)
                .Include(x => x.Operator)
                .SingleOrDefaultAsync();
        }

        public override async Task<PagedList<ProductionDTO>> GetPagedAsync(UserParams userParams) 
        {
            //apply filters and sorting
            var query = _context.Productions.AsQueryable();

            if (!String.IsNullOrEmpty(userParams.Machine))
            {
                query = query.Where(x => x.Machine.Name == userParams.Machine);
            }

            if (!String.IsNullOrEmpty(userParams.Operator))
            {
                query = query.Where(x => x.Operator.UserName == userParams.Operator);
            }

            if (!String.IsNullOrEmpty(userParams.StartDate) && !String.IsNullOrEmpty(userParams.EndDate))
            {
                var dateStart = DateOnly.FromDateTime(DateTime.ParseExact(userParams.StartDate, "dd-MM-yyyy",null));
                var dateEnd = DateOnly.FromDateTime(DateTime.ParseExact(userParams.EndDate, "dd-MM-yyyy", null));

                query = query.Where(x => x.ProductionDate >= dateStart && x.ProductionDate <= dateEnd);
            }

            if (userParams.Shift.HasValue)
            {
                query = query.Where(x => x.Shift == userParams.Shift);
            }   

            query = query.OrderByDescending(x => x.ProductionDate)
                .ThenBy(x => x.Shift)
                .ThenBy(x => x.Machine)
                .ThenBy(x => x.Operator);


            return await PagedList<ProductionDTO>.CreateAsync(
                query.ProjectTo<ProductionDTO>(_mapper.ConfigurationProvider).AsNoTracking(), 
                userParams.PageNumber, userParams.PageSize);
        }

        public async Task<Production> Exists(int shift, string machine, string tyre)
        {
            return await _context.Productions
                .Include(x => x.Machine).Include(x => x.Tyre)
                .Where(x => x.Shift == shift && x.Machine.Name == machine && x.Tyre.Code == tyre)
                .SingleOrDefaultAsync();
        }
    }
}