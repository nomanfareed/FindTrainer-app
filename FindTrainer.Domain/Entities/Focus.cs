using FindTrainer.Domain.Common;
using System.Collections.Generic;

namespace FindTrainer.Domain.Entities
{
    public class Focus : Entity
    {
        public string Name { get; set; }

        public virtual ICollection<ApplicationUserFocus> ApplicationUserFocuses { get; set; }
    }
}
