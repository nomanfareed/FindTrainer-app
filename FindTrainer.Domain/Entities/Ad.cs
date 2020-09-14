using FindTrainer.Domain.Common;
using System;
namespace FindTrainer.Domain.Entities
{
    public class Ad : Entity
    {
        public int AdsBidding { get; set; }
        public DateTime Expire { get; set; }
    }
}
