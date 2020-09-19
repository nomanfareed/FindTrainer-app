using System;
using System.ComponentModel.DataAnnotations;

namespace FindTrainer.Application.Dtos
{
    public class CertificationForCreationDto
    {
        [Required]
        [StringLength(300, MinimumLength = 10, ErrorMessage = "You must write the description characters length between 10 and 300 characters")]
        public string Description { get; set; }

        [Required]
        [StringLength(90, MinimumLength = 2, ErrorMessage = "You must write the title characters length between 2 and 90 characters")]
        public string Title { get; set; }
    }
}
