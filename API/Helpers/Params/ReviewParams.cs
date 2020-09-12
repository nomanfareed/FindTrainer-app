namespace API.Helpers.Params
{
    public class ReviewParams : BaseParams
    {
        public ReviewParams()
        {
            pageSize = 6;
            MaxPageSize = 20;
        }

        public string OrderBy { get; set; }
    }
}