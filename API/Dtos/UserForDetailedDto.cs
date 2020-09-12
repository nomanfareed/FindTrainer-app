using System;
using System.Collections.Generic;

namespace API.Dtos
{
    public class UserForDetailedDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public IReadOnlyList<string> Focus { get; set; }
        public string Gender { get; set; }
        public string KnownAs { get; set; }
        public string Created { get; set; }
        public string LastActive { get; set; }
        public string Introduction { get; set; }
        public AddressToReturnDto Address { get; set; }
        public int AvgStar { get; set; }
        public int TotalStars { get; set; }
        public string PhotoUrl { get; set; }
    }
}