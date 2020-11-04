using System;
using System.Collections.Generic;
using FindTrainer.Domain.Common;
using Microsoft.AspNetCore.Identity;
using static FindTrainer.Domain.Enums;

namespace FindTrainer.Domain.Entities.Security
{
    public class ApplicationUser : IdentityUser<int>, IEntity
    {

        public ApplicationUser()
        {
            ApplicationUserFocuses = new HashSet<ApplicationUserFocus>();
            ReceivedMessages = new HashSet<UserMessage>();
            SentMessages = new HashSet<UserMessage>();
        }

        public virtual ICollection<ApplicationUserFocus> ApplicationUserFocuses { get; set; }
        public virtual ICollection<UserMessage> ReceivedMessages { get; set; }
        public virtual ICollection<UserMessage> SentMessages { get; set; }

        public Gender Gender { get; set; }
        public bool? IsTrainer { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }

        public int? AddressId { get; set; }
        public virtual Address Address { get; set; }
        public virtual ICollection<Certification> Certifications { get; set; }

        public virtual ICollection<Review> ReviewsSent { get; set; }
        public virtual ICollection<Review> ReviewsReceived { get; set; }

        public virtual ICollection<UserStats> UserStats { get; set; }

        public int? PhotoId { get; set; }
        public virtual Photo Photo { get; set; }
        public int? AdsBidding { get; set; }
    }
}
