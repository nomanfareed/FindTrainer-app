using System;
namespace API.Dtos
{
    public class ReviewForListDto
    {
        public Guid SenderId { get; set; }
        public virtual string SenderName { get; set; }
        public string Content { get; set; }
        public int Stars { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}