using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpdateSalesDTO
    {
        public string Id { get; set; }
        
        public string DestinationMarket { get; set; }

        public string PurchasingCompany { get; set; }

        public string Production { get; set; }
    }
}