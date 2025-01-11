using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ProfileDTO
    {
        public string Firstname { get; set; }

        public string Lastname { get; set; }
        
        public string Username { get; set; }

        public string Role { get; set; }
    }
}