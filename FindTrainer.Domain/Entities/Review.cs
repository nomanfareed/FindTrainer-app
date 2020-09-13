using FindTrainer.Domain.Common;
using FindTrainer.Domain.Entities.Security;
using System;

namespace FindTrainer.Domain.Entities
{
    public class Review : Entity
    {

        public int UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public string Content { get; set; }
        public int Stars { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
