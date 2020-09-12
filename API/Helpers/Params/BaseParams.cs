using System;

namespace API.Helpers.Params
{
    public class BaseParams
    {
        protected int MaxPageSize;
        public int PageNumber { get; set; } = 1;
        protected int pageSize;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        public Guid UserId { get; set; }
    }
}