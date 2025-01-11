using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ISalesRepository: IBaseRepository<Sales,SalesDTO>
    {
        Task<Sales> GetSaleAsync(string id);

    }
}