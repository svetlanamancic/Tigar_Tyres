

namespace API.DTOs
{
    public class ProductionDTO
    {
        public string? Id { get; set; }
        
        public DateOnly? ProductionDate { get; set; } 
        
        public int Quantity { get; set; }

        public int Shift { get; set; }

        public string Machine { get; set; } = "";

        public string Tyre { get; set; } = "";

        public string? Operator { get; set; } 

        public bool ModifiedFlag { get; set; }

        public string? Modifier { get; set; }

        public DateTime? DateModified { get; set; }

        public string? Sale { get; set; }
        
    }
}