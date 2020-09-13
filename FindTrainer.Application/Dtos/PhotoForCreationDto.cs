

using Microsoft.AspNetCore.Http;

namespace FindTrainer.Application.Dtos
{
    public class PhotoForCreationDto
    {
        public string Url { get; set; }
        public string PublicId { get; set; }

        public IFormFile File { get; set; }
    }
}
