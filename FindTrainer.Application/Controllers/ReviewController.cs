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

        [HttpPost("AddReview/{recipientId}")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> AddReview(ReviewForCreationDto reviewIntake)
        {

            if (await UserAlreadyReviewed(reviewIntake.RecieverId))
            {
                return Unauthorized("You already gave a review to this person");
            }

            var newReview = new Review
            {
                SenderId = CurrentUserId,
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
            return (await _reviewsQuery.Query.Where(x => x.SenderId == CurrentUserId && x.RecipientId == recipientId).CountAsync()) > 0;
        }


        [HttpDelete("DeleteReview/{reviewId}")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> DeleteReview(int reviewId)
        {
            bool success = false;
            if (User.IsInRole("Admin"))
            {
                success = await _reviewsRepo.Delete(reviewId);
            }
            else
            {
                success = await _reviewsRepo.Delete(x => x.SenderId == CurrentUserId && x.Id == reviewId);
            }
            if (!success)
            {
                return NotFound("Review not found");
            }

            return Ok();
        }
        [HttpGet("{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetReviewsForTrainer(int trainerId, int page, int pageSize = Constants.Paging.DefaultPageSize)
        {

            var reviews = await _reviewsQuery.Get(rev => rev.RecipientId == trainerId, null, o => o.CreatedDate, true, (page - 1) * pageSize, pageSize);

            var reviewToReturn = _mapper.Map<IEnumerable<ReviewForListDto>>(reviews);

            return Ok(reviewToReturn);
        }
    }
}
