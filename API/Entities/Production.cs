namespace API.Entities
{
    public class Production
    {
        public string Id { get; set; }

        public int Quantity { get; set; }

        public DateOnly ProductionDate { get; set; }

        public int Shift { get; set; }

        public Machine Machine { get; set; }

        public Tyre Tyre { get; set; }

        public Sales? SalesRecord { get; set; }

        public string? SalesRecordId { get; set; }

        public AppUser Operator { get; set; }

        public string OperatorId { get; set; }

        public bool ModifiedFlag { get; set; }

        public AppUser? Modifier { get; set; }

        public string? ModifierId { get; set; } 

        public DateTime? DateModified { get; set; }

    }
}