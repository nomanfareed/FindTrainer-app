using FindTrainer.Domain.Common;
using System;

namespace FindTrainer.Domain.Entities
{
    public class NewSignup : Entity
    {
        public DateTime SignupDate { get; set; }

        public int UserNumber { get; set; }
    }
}
