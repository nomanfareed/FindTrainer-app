using FindTrainer.Domain.Common;
namespace FindTrainer.Domain.Entities
{
    public class Address : Entity
    {
        public string FullAddress { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Province { get; set; }
    }
}
