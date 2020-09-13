using FindTrainer.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace FindTrainer.Domain.Entities
{
    public class Address : Entity
    {
        public string FullAddress { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Province { get; set; }
    }
}
