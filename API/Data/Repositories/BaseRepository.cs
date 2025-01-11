using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class BaseRepository<TEntity, TDTO> : IBaseRepository<TEntity,TDTO>
        where TEntity : class
        where TDTO : class
    {
        protected internal DataContext _context;
        protected internal IMapper _mapper;


        public BaseRepository(DataContext context, IMapper mapper) 
        {
            _context = context;
            _mapper = mapper;
        }

        public void Add(TEntity entity) 
        {
            _context.Set<TEntity>().Add(entity);
        }

        public virtual async Task<PagedList<TDTO>> GetPagedAsync(UserParams userParams)
        {
            var query = _context.Set<TEntity>()
                .ProjectTo<TDTO>(_mapper.ConfigurationProvider)
                .AsQueryable();

            return await PagedList<TDTO>.
                CreateAsync(query, userParams.PageNumber, userParams.PageSize);
        }

        public virtual async Task<IEnumerable<TDTO>> GetAllAsync() 
        {
            return await _context.Set<TEntity>()
                .ProjectTo<TDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public void Update(TEntity entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
        }




    }
}