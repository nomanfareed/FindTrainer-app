
namespace FindTrainer.Application.Dtos.UserMessage
{
    public class UserMessagesDto
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string CreateDateTime { get; set; }
        public string TrainerName { get; set; }
        public bool IsRead { get; set; }
    }
}
