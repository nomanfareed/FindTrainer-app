using System;
using System.Threading.Tasks;
using API.Helpers;
using API.Helpers.Params;
using API.Models;

namespace API.Data
{
    public interface IFindTrainerRepository
    {
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<Review> GetReview(Guid sender, Guid receiver);
        Task<PagedList<Review>> GetReviewsForUser(ReviewParams reviewParams);
        Task<PagedList<Certification>> GetCertificationsForUser(CertParams reviewParams);
    }
}