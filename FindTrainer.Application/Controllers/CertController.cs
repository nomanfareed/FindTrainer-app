using System.Threading.Tasks;
using FindTrainer.Application.Dtos;
using FindTrainer.Domain.Entities;
using FindTrainer.Domain.Entities.Security;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using FindTrainer.Persistence.Common;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace FindTrainer.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CertController : ApplicationController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly Repository<Certification> _certificationRepo;
        private readonly ReadOnlyQuery<Certification> _certificationQuery;
        private readonly IMapper _mapper;
        public CertController(UserManager<ApplicationUser> userManager,
                              Repository<Certification> certificationRepo,
                              ReadOnlyQuery<Certification> certificationQuery,
                              IMapper mapper)
        {
            _userManager = userManager;
            _certificationRepo = certificationRepo;
            _certificationQuery = certificationQuery;
            _mapper = mapper;
        }
        [HttpPost("Add")]

        [Authorize(Roles = "Trainer, Amin")]
        public async Task<IActionResult> AddCert([FromBody] CertificationForCreationDto input)
        {
            var certification = _mapper.Map<Certification>(input);

            if(User.IsInRole("Admin"))
            {
                if(!input.TrainerId.HasValue)
                {
                    return BadRequest("Please specify the trainer id to add certificate to");
                }

                if(!await IsTrainer(input.TrainerId.Value))
                {
                    return NotFound("No such a trainer with specified ID");
                }

                certification.trainerId = input.TrainerId.Value;
            }

            certification.trainerId = CurrentUserId;

            await _certificationRepo.Add(certification);

            return Ok();
        }


        private async Task<bool> IsTrainer(int trainerId)
        {
            ApplicationUser user = await _userManager.FindByIdAsync(trainerId.ToString());

            return user.IsTrainer.HasValue && user.IsTrainer.Value;

        }

        [HttpDelete("{certId}")]
        [Authorize(Roles = "Admin,Trainer")]
        public async Task<IActionResult> DeleteCert(int certId)
        {
            bool success = await _certificationRepo.Delete(cert => cert.trainerId == CurrentUserId && cert.Id == certId);

            if(success)
            {
                return Ok();
            }

            return NotFound("Certificate does not exist");
        }


        [HttpGet("list")]
        [AllowAnonymous]
        public async Task<IActionResult> GetCertificationsForTrainer(int trainerId, int pageNumber, int pageSize = Constants.Paging.DefaultPageSize)
        {
            if(pageSize > Constants.Paging.MaxPageSize)
            {
                return BadRequest($"The maximum page size is {Constants.Paging.MaxPageSize}");
            }


            ApplicationUser user = await _userManager.FindByIdAsync(trainerId.ToString());
            if(user == null)
            {
                return NotFound("Trainer does not exist");
            }

            if(!user.IsTrainer.HasValue || !user.IsTrainer.Value)
            {
                return NotFound("Invalid trainer ID");
            }

            int skip = (pageNumber - 1) * pageSize;
            List<Certification> userCertifications = await _certificationQuery.Get(cert => cert.trainerId == trainerId, null, ord => ord.Id, true, skip, pageSize);

            var certsToReturn = _mapper.Map<IEnumerable<CertificationForReturnDto>>(userCertifications);

            return Ok(certsToReturn);
        }
    }
}
