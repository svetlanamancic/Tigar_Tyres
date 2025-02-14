using System.Text;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentity<AppUser,AppRole>(opt => {
                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequireDigit = false;
                opt.Password.RequireLowercase = false;
                opt.Password.RequireUppercase = false;

            })
                .AddRoles<AppRole>()
                .AddRoleManager<RoleManager<AppRole>>()
                .AddSignInManager<SignInManager<AppUser>>()
                .AddRoleValidator<RoleValidator<AppRole>>()
                .AddEntityFrameworkStores<DataContext>();

            services.AddAuthentication(opt => {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options => 
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("TokenKey").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            //review policies later
            services.AddAuthorization(opt => {
                
                opt.AddPolicy("HasRole", policy => policy.RequireAssertion(context => 
                    context.User.IsInRole("Admin") || context.User.IsInRole("Production Operator") 
                    || context.User.IsInRole("Quality Supervisor") || context.User.IsInRole("Business Unit Leader")));
                
                opt.AddPolicy("UpdateDelete", policy => policy.RequireAssertion(
                    context => context.User.IsInRole("Quality Supervisor") || context.User.IsInRole("Admin") 
                ));
                
                opt.AddPolicy("AdminRole", policy => policy.RequireRole("Admin"));

                opt.AddPolicy("QualitySupervisorRole", policy => policy.RequireRole("Quality Supervisor"));
                
                opt.AddPolicy("ViewSalesPolicy", policy => policy.RequireAssertion(
                    context => context.User.IsInRole("Quality Supervisor") ||  context.User.IsInRole("Business Unit Leader") 
                    || context.User.IsInRole("Admin")
                ));

                opt.AddPolicy("AddProduction", policy => policy.RequireAssertion(
                    context => context.User.IsInRole("Production Operator") || context.User.IsInRole("Quality Supervisor")
                ));

            });

            return services;
        }
    }
}