using FindTrainer.Domain.Common;

namespace FindTrainer.Domain.Entities
{
    public class Photo : Entity
    {
        public string Url { get; set; }
        public string PublicId { get; set; }
    }
}
