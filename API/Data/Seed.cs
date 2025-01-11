using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedData(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {   
            #region SeedRole

            if(!roleManager.Roles.Any()) 
            {
                var roles = new List<AppRole>{
                    new AppRole {
                        Id = Guid.NewGuid().ToString(),
                        Name = "Admin"
                    },
                    new AppRole {
                        Id = Guid.NewGuid().ToString(),
                        Name = "Production Operator"
                    },
                    new AppRole {
                        Id = Guid.NewGuid().ToString(),
                        Name = "Quality Supervisor"
                    },
                    new AppRole {
                        Id = Guid.NewGuid().ToString(),
                        Name = "Business Unit Leader"
                    }
                };

                foreach(var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }
            }

            #endregion


            #region SeedAdmin
            //seed user admin
            if(await userManager.FindByNameAsync("adminka") == null)
            {
                var role = await roleManager.FindByNameAsync("Admin");
                var user = new AppUser{
                    Id = Guid.NewGuid().ToString(),
                    UserName = "adminka",
                    FirstName = "Svetlana",
                    LastName = "Mancic",
                    Role = role
                };

                
                await userManager.CreateAsync(user, "admin123");

                await userManager.AddToRoleAsync(user, "Admin");
            }

            #endregion
            
            return;
            
        }
    }
}