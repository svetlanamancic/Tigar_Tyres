using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository: IBaseRepository<AppUser, ProfileDTO>
    {
        Task<AppUser> GetUserByUsernameAsync(string username);

        Task<ProfileDTO> GetProfileByUsernameAsync(string username);

        Task<AppUser> GetUserAsync(string? id);

        AppUser GetUser(string id);

    }
}