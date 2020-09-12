namespace API.Helpers.Params
{
    public class CertParams : BaseParams
    {
        public CertParams()
        {
            pageSize = 6;
            MaxPageSize = 20;
        }

        public string OrderBy { get; set; }
    }
}