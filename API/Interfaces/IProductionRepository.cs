using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IProductionRepository: IBaseRepository<Production,ProductionDTO>
    {
        Task<Production> GetProductionAsync(string id);

        Task<Production> Exists(int shift, string machine, string tyre);

    }
}