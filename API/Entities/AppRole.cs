using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    // [NotMapped]
    public class AppRole: IdentityRole<string>
    {
        
    }
}