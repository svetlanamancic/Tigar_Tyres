using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<string>
    {

        public AppRole Role { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public ICollection<Production> Productions { get; set; }

        public ICollection<Production> ModifiedProductions { get; set; }

        public ICollection<Sales> SalesModified { get; set; }

        public ICollection<Sales> Sales { get; set; }

    }
}