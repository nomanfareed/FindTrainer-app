using System;
using FindTrainer.Domain.Common;
using FindTrainer.Domain.Entities.Security;

namespace FindTrainer.Domain.Entities
{
    public class UserMessage : Entity
    {
        public int TrainerId { get; set; }
        public int UserId { get; set; }

        public string Title { get; set; }
        public string Content { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public DateTime CreateDateTime { get; set; }
        public DateTime? VisiteDateTime { get; set; }
        public DateTime ExpireDateTime { get; set; }

        public ApplicationUser Trainer { get; set; }
        public ApplicationUser User { get; set; }
    }
}
