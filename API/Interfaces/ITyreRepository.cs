using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ITyreRepository: IBaseRepository<Tyre,TyreDTO>
    {
        Task<Tyre> GetTyreAsync(string tyre);

        Task<bool> TyreExists(string code);

    }
}