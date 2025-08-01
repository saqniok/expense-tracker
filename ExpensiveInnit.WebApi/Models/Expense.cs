using System.Text.Json.Serialization;

namespace ExpensiveInnit.WebApi.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public string Description { get; set; } = null!;
        public decimal Amount { get; set; }

        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly Date { get; set; }
    }
}