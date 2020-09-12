using System;

namespace API.Models
{
    public class Certification : BaseEntity_User
    {
        public string Description { get; set; }


        public string Title { get; set; }
        public DateTime Created { get; set; }
    }
}