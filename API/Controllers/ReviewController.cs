using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using API.Data;
using API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Dtos;
using API.Helpers.Params;
using System.Collections.Generic;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IFindTrainerRepository _repo;
        private readonly IGenericRepository<Review> _genReviewRepo;
        private readonly IGenericRepository<User> _genUserRepo;
        private readonly IMapper _mapper;
        public ReviewController(IFindTrainerRepository repo, IGenericRepository<User> genRepoUser, IMapper mapper, IGenericRepository<Review> genRepoReview)
        {
            _mapper = mapper;
            _repo = repo;
            _genReviewRepo = genRepoReview;
            _genUserRepo = genRepoUser;
        }
        [ServiceFilter(typeof(LogUserActivity))]
        [Authorize]
        [HttpPost("{recipientId}")]
        public async Task<IActionResult> AddReview(Guid recipientId, ReviewForCreationDto reviewIntake)
        {
            var senderId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var sender = await _genUserRepo.GetByIdAsync(senderId);
            if (sender == null)
                return Unauthorized();

            if (await _repo.GetReview(senderId, recipientId) != null)
                return BadRequest("You already gave a review to this person");

            var recipient = await _genUserRepo.GetByIdAsync(recipientId);

            if (recipient == null)
                return NotFound();

            if (recipient.IsTrainer == false)
                return BadRequest("You can only give review to trainer");

            var newReview = new Review
            {
                SenderId = senderId,
                RecipientId = recipientId,
                Stars = reviewIntake.Stars,
                CreatedDate = DateTime.Now,
                Content = reviewIntake.Content,
            };

            _genReviewRepo.Add(newReview);

            if (await _genReviewRepo.SaveAll())
                return Ok();

            return BadRequest("Failed to add review");
        }

        [ServiceFilter(typeof(LogUserActivity))]
        [Authorize]
        [HttpDelete("{reviewId}")]
        public async Task<IActionResult> DeleteReview(Guid reviewId)
        {
            var senderId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value); ;

            var review = await _genReviewRepo.GetByIdAsync(reviewId);

            if (review == null)
                return NotFound();

            if (review.SenderId != senderId)
                return Unauthorized();

            _genReviewRepo.Delete(review);


            if (await _genReviewRepo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete review");
        }
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetReviewsForUser(Guid userId, ReviewParams reviewParams)
        {
            reviewParams.UserId = userId;

            var reviews = await _repo.GetReviewsForUser(reviewParams);

            var reviewToReturn = _mapper.Map<IEnumerable<ReviewForListDto>>(reviews);

            Response.AddPagination(reviews.CurrentPage, reviews.PageSize,
                 reviews.TotalCount, reviews.TotalPages);

            return Ok(reviewToReturn);
        }
    }
}