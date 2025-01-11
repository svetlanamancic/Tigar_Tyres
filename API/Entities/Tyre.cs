namespace API.Entities
{
    public class Tyre
    {
        public string Id { get; set; }

        public string Code { get; set; }

        public string Type { get; set; }

        public double Price { get; set; }

        public ICollection<Production> Productions { get; set; }

        public ICollection<Sales> Sales { get; set; }

    }
}