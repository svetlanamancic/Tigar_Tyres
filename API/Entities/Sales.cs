namespace API.Entities
{
    public class Sales
    {
        public string Id { get; set; }

        public int Quantity { get; set; }

        public double Price { get; set; }

        public string DestinationMarket { get; set; }

        public string PurchasingCompany { get; set; }

        public DateTime SaleDate { get; set; }

        public Tyre Tyre { get; set; }

        public Production Production { get; set; }

        public string ProductionId { get; set; }

        public AppUser Supervisor { get; set; }

        public string SupervisorId { get; set; }

        public bool ModifiedFlag { get; set; }

        public AppUser? Modifier { get; set; }

        public string? ModifierId { get; set; }

        public DateTime? DateModified { get; set; }
    }
}