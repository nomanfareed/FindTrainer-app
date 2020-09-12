using System;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class UserForRegisterDto : UserDefaultIntakeDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(16, MinimumLength = 8, ErrorMessage = "You must specify password between 8 and 16 characters")]
        public string Password { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }

        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}