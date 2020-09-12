using System;
/**
Get all trainers
*/
namespace API.Dtos
{
    public class UserForListDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public string KnownAs { get; set; }
        public String LastActive { get; set; }
        public int AvgStar { get; set; }
        public int TotalStars { get; set; }
        public string PhotoUrl { get; set; }
    }
}