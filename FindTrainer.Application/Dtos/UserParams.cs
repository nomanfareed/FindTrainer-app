

using static FindTrainer.Domain.Enums;

namespace FindTrainer.Application.Dtos
{
    public class UserParams
    {
        public UserParams()
        {
            PageSize = Constants.Paging.MaxPageSize;
        }
        public Gender? Gender { get; set; }
        public string OrderBy { get; set; }
        public string KnownAs { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Province { get; set; }
        public string Focus { get; set; }

        public int PageNumber { get; set; } = 1;

        private int _pageSize;
        public int PageSize
        {
            get { return _pageSize; }
            set { _pageSize = (value > Constants.Paging.MaxPageSize) ? Constants.Paging.MaxPageSize : value; }
        }
    }
}
