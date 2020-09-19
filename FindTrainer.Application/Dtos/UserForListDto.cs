using System;

namespace FindTrainer.Application.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public string KnownAs { get; set; }
        public DateTime LastActive { get; set; }
        public int AvgStar { get; set; }
        public int TotalStars { get; set; }
        public string PhotoUrl { get; set; }
    }
}
