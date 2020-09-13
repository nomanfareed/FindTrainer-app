using FindTrainer.Domain.Entities.Security;

namespace FindTrainer.Domain.Entities
{
    public class ApplicationUserFocus
    {
        public int FocusId { get; set; }
        public Focus Focus { get; set; }

        public int UserId { get; set; }

        public ApplicationUser User { get; set; }
    }
}
