using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpdateProductionDTO
    {
         public string Id { get; set; }
                
        public int Quantity { get; set; }

        public int Shift { get; set; }

        public string Machine { get; set; } = "";

        public string Tyre { get; set; } = "";

    }
}