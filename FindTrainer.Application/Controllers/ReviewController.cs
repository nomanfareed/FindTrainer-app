using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using FindTrainer.Application.Dtos;
using FindTrainer.Domain.Entities;
using FindTrainer.Persistence.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace FindTrainer.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ApplicationController
    {
        private readonly Repository<Review> _reviewsRepo;
        private readonly ReadOnlyQuery<Review> _reviewsQuery;
        private readonly IMapper _mapper;
        public ReviewController(Repository<Review> reviewsRepo,
                                ReadOnlyQuery<Review> reviewsQuery,
                                IMapper mapper)
        {
            _reviewsRepo = reviewsRepo;
            _reviewsQuery = reviewsQuery;
            _mapper = mapper;
        }

        [HttpPost("{recipientId}")]
        [Authorize(Roles = "Admin, User")]
        public async Task<IActionResult> AddReview(ReviewForCreationDto reviewIntake)
        {

            if(await UserAlreadyReviewed(reviewIntake.RecieverId))
            {
                return Unauthorized("You already gave a review to this person");
            }

            var newReview = new Review
            {
                SenderId = UserId,
                RecipientId = reviewIntake.RecieverId,
                Stars = reviewIntake.Stars,
                CreatedDate = DateTime.Now,
                Content = reviewIntake.Content,
            };

            await _reviewsRepo.Add(newReview);


            return Ok();
        }


        private async Task<bool> UserAlreadyReviewed(int recipientId)
        {
            return (await _reviewsQuery.Query.Where(x => x.SenderId == UserId && x.RecipientId == recipientId).CountAsync()) > 0;
        }


        [HttpDelete("{reviewId}")]
        [Authorize(Roles = "Admin, User")]
        public async Task<IActionResult> DeleteReview(int reviewId)
        {
            bool success = await _reviewsRepo.Delete(reviewId);

            if(!success)
            {
                return NotFound("Review not found");
            }

            return Ok();
        }
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetReviewsForUser(int userid, int page, int pageSize = Constants.Paging.DefaultPageSize)
        {

            var reviews = await _reviewsQuery.Get(rev => rev.RecipientId == userid, null, o => o.CreatedDate, true, (page - 1) * pageSize, pageSize);

            var reviewToReturn = _mapper.Map<IEnumerable<ReviewForListDto>>(reviews);

            return Ok(reviewToReturn);
        }
    }
}
