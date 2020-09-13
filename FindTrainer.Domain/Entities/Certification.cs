using System;
using FindTrainer.Domain.Common;

namespace FindTrainer.Domain.Entities
{
    public class Certification : Entity
    {
        public string Description { get; set; }
        public string Title { get; set; }
        public DateTime Created { get; set; }

        public int UserId { get; set; }
    }
}
