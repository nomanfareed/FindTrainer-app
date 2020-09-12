using System;

namespace API.Dtos
{
    public class CertificationForReturnDto
    {
        public string Description { get; set; }

        public string Title { get; set; }
        public DateTime Created { get; set; }
        public Guid Id { get; set; }
    }
}