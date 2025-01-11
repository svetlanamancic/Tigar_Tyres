using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class SalesDTO
    {
        public string Id { get; set; }

        public string DestinationMarket { get; set; }

        public string PurchasingCompany { get; set; }

        public int Quantity { get; set; }

        public double Price { get; set; }

        public string Tyre { get; set; }

        public string Supervisor { get; set; }

        public string Production { get; set; }

        public DateTime SaleDate { get; set; }

        public bool ModifiedFlag { get; set; }

        public string? Modifier { get; set; }

        public DateTime? DateModified { get; set; }

    }
}