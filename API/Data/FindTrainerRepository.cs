using System;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;
using API.Helpers.Params;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class FindTrainerRepository : IFindTrainerRepository
    {
        private readonly DataContext _context;
        public FindTrainerRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.Include(u => u.ReviewsReceived).Include(u => u.Profile).OrderByDescending(u => u.LastActive).AsQueryable();

            //All Trainers ONLY
            users = users.Where(u => u.IsTrainer == true);

            users = users.Where(u => u.Id != userParams.UserId);

            //Gender
            if ((int)userParams.Gender < 3 && (int)userParams.Gender > 0)
            {
                users = users.Where(u => (int)u.Gender == (int)userParams.Gender);
            }
            //Locations
            if (!string.IsNullOrEmpty(userParams.City))
            {
                users = users.Where(u => u.Address.City == userParams.City);
            }
            if (!string.IsNullOrEmpty(userParams.Country))
            {
                users = users.Where(u => u.Address.Country == userParams.Country);
            }
            if (!string.IsNullOrEmpty(userParams.Province))
            {
                users = users.Where(u => u.Address.Province == userParams.Province);
            }
            //Focus
            if (!string.IsNullOrEmpty(userParams.Focus))
            {
                users = users.Where(u => u.Focus.Any(x => x.Name == userParams.Focus));
            }
            //Known As
            if (!string.IsNullOrEmpty(userParams.KnownAs))
            {
                users = users.Where(u => u.KnownAs == userParams.KnownAs);
            }
            //Order By
            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy.ToLower())
                {
                    case "popular":
                        users = users.OrderByDescending(u => u.ReviewsReceived.Count());
                        break;
                    case "highest-rated":
                        users = users.OrderByDescending(u => u.ReviewsReceived.Average(x => x.Stars));
                        break;
                    case "newest":
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }


        public async Task<Review> GetReview(Guid sender, Guid receiver)
        {
            return await _context.Reviews.FirstOrDefaultAsync(m => m.SenderId == sender && m.RecipientId == receiver);
        }

        public async Task<PagedList<Review>> GetReviewsForUser(ReviewParams reviewParams)
        {
            var most_recent = "most_recent";
            var reviews = _context.Reviews.AsQueryable();
            if (string.IsNullOrEmpty(reviewParams.OrderBy))
            {
                reviewParams.OrderBy = most_recent;
            }
            switch (reviewParams.OrderBy.ToLower())
            {
                case "most_recent":
                    reviews = reviews.OrderByDescending(u => u.CreatedDate);
                    break;
                case "top_reviews":
                    reviews = reviews.OrderByDescending(u => u.Stars);
                    break;
                case "low_review":
                    reviews = reviews.OrderByDescending(u => u.Stars);
                    break;
            }

            return await PagedList<Review>.CreateAsync(reviews, reviewParams.PageNumber, reviewParams.PageSize);
        }
        public async Task<PagedList<Certification>> GetCertificationsForUser(CertParams certParams)
        {
            var certs = _context.Certifications.AsQueryable();
            certs = certs.Where(x => x.UserId == certParams.UserId);
            if (string.IsNullOrEmpty(certParams.OrderBy))
            {
                certParams.OrderBy = "most_recent";
            }
            switch (certParams.OrderBy.ToLower())
            {
                case "most_recent":
                    certs = certs.OrderByDescending(u => u.Created);
                    break;
                case "oldest":
                    certs = certs.OrderBy(u => u.Created);
                    break;
            }

            return await PagedList<Certification>.CreateAsync(certs, certParams.PageNumber, certParams.PageSize);
        }
    }
}