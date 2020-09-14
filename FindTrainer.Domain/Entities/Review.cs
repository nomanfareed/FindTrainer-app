using FindTrainer.Domain.Common;
using FindTrainer.Domain.Entities.Security;
using System;

namespace FindTrainer.Domain.Entities
{
    public class Review : Entity
    {

        public int SenderId { get; set; }
        public virtual ApplicationUser Sender { get; set; }
        public string Content { get; set; }
        public int Stars { get; set; }

        public int RecipientId { get; set; }

        public ApplicationUser RecipientUser { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
