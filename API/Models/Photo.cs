using System;

namespace API.Models
{
    public class Photo : BaseEntity_User
    {
        public string Url { get; set; }
        public string PublicId { get; set; }
    }
}