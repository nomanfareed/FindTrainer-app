using System;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class ReviewForCreationDto
    {
        [Required]
        [StringLength(300, MinimumLength = 10, ErrorMessage = "The review characters length must be between 10 and 300 characters")]
        public string Content { get; set; }
        [Required]
        [Range(0, 5,
        ErrorMessage = "Value for {0} must be between {1} and {2}.")]
        public int Stars { get; set; }
    }
}