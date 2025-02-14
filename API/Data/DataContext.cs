using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, string, 
        IdentityUserClaim<string>, IdentityUserRole<string>, 
        IdentityUserLogin<string>, IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
            AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
        }
        
        public DbSet<Machine> Machines { get; set; }
        public DbSet<Tyre> Tyres { get; set; }
        public DbSet<Production> Productions { get; set; }
        public DbSet<Sales> Sales { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Machine>().HasKey(u => u.Id);
            modelBuilder.Entity<Tyre>().HasKey(u => u.Id);
            modelBuilder.Entity<Production>().HasKey(u => u.Id);
            modelBuilder.Entity<Sales>().HasKey(u => u.Id);
            modelBuilder.Entity<AppUser>().HasKey(x => x.Id);
            
            //map for modifier properties in sales and production
            modelBuilder.Entity<AppUser>().HasMany(x => x.ModifiedProductions).WithOne(x => x.Modifier).HasForeignKey(x => x.ModifierId);

            modelBuilder.Entity<AppUser>().HasMany(x => x.SalesModified).WithOne(x => x.Modifier).HasForeignKey(x => x.ModifierId);

            //map for production property in sales
            modelBuilder.Entity<Sales>().HasOne(x => x.Production).WithOne(x => x.SalesRecord).HasForeignKey<Sales>(x => x.ProductionId);
            
            base.OnModelCreating(modelBuilder);

        }
    }
}