using API.Interfaces;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using API.Helpers;
using AutoMapper;
using API.DTOs;
using AutoMapper.QueryableExtensions;

namespace API.Data
{
    public class MachineRepository : BaseRepository<Machine,MachineDTO>, IMachineRepository
    {
        // private readonly DataContext _context;
        // private readonly IMapper _mapper;

        public MachineRepository(DataContext context, IMapper mapper): base(context,mapper)
        {
            // _context = context;
            // _mapper = mapper;
        }
        public async Task<Machine> GetMachineAsync(string machine)
        {
            return await _context.Machines
                .SingleOrDefaultAsync(x => x.Name == machine);
        }

        public async Task<bool> MachineExists(string machineName)
        {
            return await _context.Machines.AnyAsync(x => x.Name == machineName);
        }

    }
}