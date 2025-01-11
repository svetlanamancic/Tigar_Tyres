namespace API.Helpers
{
    public class UserParams : PaginationParams
    {
        public int? Shift { get; set; } = null;

        public string? Operator { get; set; } = "";

        public string? Machine { get; set; } = "";

        public string? StartDate { get; set; } = "";

        public string? EndDate { get; set;} = "";

        //add sorting
        //add date, min and max date
    }
}