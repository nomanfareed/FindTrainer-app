using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using static FindTrainer.Domain.Enums;

namespace FindTrainer.Application.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        [StringLength(16, MinimumLength = 8, ErrorMessage = "You must specify password between 8 and 16 characters")]
        public string Password { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;

        [Required]
        public Gender Gender { get; set; }
        public ICollection<string> Focus { get; set; }

        [Required]
        public string KnownAs { get; set; }

        [Required]
        public bool IsTrainer { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public string Province { get; set; }

        public string Address { get; set; }
        [Required]
        public string Introduction { get; set; }
    }
}
