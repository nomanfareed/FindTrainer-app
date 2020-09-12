using System;
using System.Collections.Generic;

namespace API.Models
{
    public class User : BaseEntity
    {
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public virtual IEnumerable<Focus> Focus { get; set; }
        public Gender Gender { get; set; }
        public bool IsTrainer { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }
        public virtual Address Address { get; set; }
        public virtual ICollection<Certification> Certifications { get; set; }
        public virtual ICollection<Review> ReviewsSend { get; set; }
        public virtual ICollection<Review> ReviewsReceived { get; set; }
        public virtual Photo Profile { get; set; }
        public int AdsBidding { get; set; }
    }
}


