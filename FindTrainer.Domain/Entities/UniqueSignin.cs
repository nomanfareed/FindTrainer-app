using FindTrainer.Domain.Common;
using System;


namespace FindTrainer.Domain.Entities
{
    public class UniqueSignin : Entity
    {
        public DateTime SigninDate { get; set; }

        public int UserNumber { get; set; }
    }
}
