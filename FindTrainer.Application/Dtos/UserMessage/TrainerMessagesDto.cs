
namespace FindTrainer.Application.Dtos.UserMessage
{
    public class TrainerMessagesDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string CreateDateTime { get; set; }
        public string UserName { get; set; }
        public bool IsNew { get; set; }
    }
}
