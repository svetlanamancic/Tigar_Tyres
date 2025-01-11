using API.Entities;
using API.DTOs;

namespace API.Interfaces
{
    public interface IMachineRepository: IBaseRepository<Machine, MachineDTO>
    {
        Task<Machine> GetMachineAsync(string machine);

        Task<bool> MachineExists(string machineName);
    }
}