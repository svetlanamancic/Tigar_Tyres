using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();

            services.AddScoped<IUnitOfWork,UnitOfWork>();
            
            services.AddAutoMapper(typeof (AutoMapperProduction).Assembly);
            
            services.AddDbContext<DataContext>(options => 
            {
                options.UseNpgsql(config.GetConnectionString("webapiDB"));
            });

            return services;
        }
    }
}