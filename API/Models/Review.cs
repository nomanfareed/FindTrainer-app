using System;

namespace API.Models
{
    public class Review : BaseEntity
    {

        public Guid SenderId { get; set; }
        public virtual User Sender { get; set; }
        public Guid RecipientId { get; set; }
        public virtual User Recipient { get; set; }
        public string Content { get; set; }
        public int Stars { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}