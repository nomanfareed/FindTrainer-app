using API.Models;

namespace API.Helpers.Params
{
    public class UserParams : BaseParams
    {
        public UserParams()
        {
            pageSize = 6;
            MaxPageSize = 20;
        }
        public Gender Gender { get; set; }
        public string OrderBy { get; set; }
        public string KnownAs { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Province { get; set; }
        public string Focus { get; set; }
    }
}