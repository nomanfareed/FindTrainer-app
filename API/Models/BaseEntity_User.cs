using System;

namespace API.Models
{
    public class BaseEntity_User : BaseEntity
    {
        public virtual User User { get; set; }
        public Guid UserId { get; set; }
    }
}