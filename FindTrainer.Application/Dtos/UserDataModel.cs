using FindTrainer.Domain.Entities;
using System;
using System.Collections.Generic;
using static FindTrainer.Domain.Enums;

namespace FindTrainer.Application.Dtos
{
    public class UserDataModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
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
