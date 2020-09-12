
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Address : BaseEntity
    {
        public string FullAddress { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Province { get; set; }
    }
}

/**
Address: _context.address.Select(m => m.City).Distinct();
*/