using System;
using FindTrainer.Domain.Common;
using FindTrainer.Domain.Entities.Security;

namespace FindTrainer.Domain.Entities
{
    public class UserStats : Entity
    {
        public int TrainerId { get; set; }
        public int Counter { get; set; }
        public DateTime DateAdded { get; set; }

        public ApplicationUser User { get; set; }
    }
}
