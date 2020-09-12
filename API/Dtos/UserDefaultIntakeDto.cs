using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class UserDefaultIntakeDto
    {
        [Required]
        public string Gender { get; set; }
        [Required]
        public ICollection<string> Focus { get; set; }

        [Required]
        public string KnownAs { get; set; }

        [Required]
        public bool IsTrainer { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Province { get; set; }

        [Required]
        public string Address { get; set; }
        [Required]
        [StringLength(300, MinimumLength = 5, ErrorMessage = "Please give a brief introduction of yourself with min 5 characters and max 300 characters.")]
        public string Introduction { get; set; }
    }
}