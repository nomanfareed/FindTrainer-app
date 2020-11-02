using System;
using System.Collections.Generic;

namespace FindTrainer.Application.Dtos
{
    public class UserForDetailedDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public IReadOnlyList<string> Focus { get; set; }
        public string Gender { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }
        public AddressToReturnDto Address { get; set; }
        public int AvgStar { get; set; }
        public int TotalStars { get; set; }
        public string PhotoUrl { get; set; }
    }
}
