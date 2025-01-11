using API.Helpers;

namespace API.Interfaces
{
    public interface IBaseRepository<TEntity, TDTO>
        where TEntity : class
        where TDTO : class
    {
         void Add(TEntity entity);

         Task<PagedList<TDTO>> GetPagedAsync(UserParams userParams);

         Task<IEnumerable<TDTO>> GetAllAsync();

        void Update(TEntity entity);
        
    }
}