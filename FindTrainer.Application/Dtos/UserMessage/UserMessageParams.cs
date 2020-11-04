

using static FindTrainer.Domain.Enums;
using static FindTrainer.Persistence.Repositorys.UserMessageRepository;

namespace FindTrainer.Application.Dtos
{
    public class UserMessageParams
    {
        public UserMessageParams()
        {
            PageSize = Constants.Paging.MaxPageSize;
        }

        public SortTypes SortType { get; set; }
        public string titleFilter { get; set; }
        public string contentFilter { get; set; }
        public string userNameFilter { get; set; }
        public string trainerFilter { get; set; }


        public int PageNumber { get; set; } = 1;

        private int _pageSize;
        public int PageSize
        {
            get { return _pageSize; }
            set { _pageSize = (value > Constants.Paging.MaxPageSize) ? Constants.Paging.MaxPageSize : value; }
        }
    }
}
