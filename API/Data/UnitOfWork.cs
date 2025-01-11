using API.Interfaces;
using AutoMapper;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;

        private readonly IMapper _mapper;   

        public UnitOfWork(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper; 
        }

        #region  properties
        
        public IUserRepository UserRepository => new UserRepository(_context, _mapper);

        public ITyreRepository TyreRepository => new TyreRepository(_context, _mapper);

        public IProductionRepository ProductionRepository => new ProductionRepository(_context, _mapper);

        public IMachineRepository MachineRepository => new MachineRepository(_context, _mapper);

        public ISalesRepository SalesRepository => new SalesRepository(_context, _mapper);


        #endregion
        
        #region functions

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }

        #endregion
    }
}