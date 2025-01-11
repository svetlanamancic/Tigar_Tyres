namespace API.Entities
{
    public class Machine
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Location { get; set; }

        public ICollection<Production> ProductionRecords { get; set; }
    }
}