using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using static FindTrainer.Domain.Enums;

namespace FindTrainer.Domain.Entities.Security
{
    public class ApplicationUser : IdentityUser<int>
    {
        public virtual ICollection<ApplicationUserFocus> ApplicationUserFocuses { get; set; }
        public Gender Gender { get; set; }
        public bool IsTrainer { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }

        public int AddressId { get; set; }
        public virtual Address Address { get; set; }
        public virtual ICollection<Certification> Certifications { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }

        public int PhotoId { get; set; }
        public virtual Photo Photo { get; set; }
        public int AdsBidding { get; set; }
    }
}
