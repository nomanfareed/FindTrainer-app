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

        [Authorize(Roles = "Trainer")]
        public async Task<IActionResult> AddCert([FromBody] CertificationForCreationDto input)
        {
            var certification = _mapper.Map<Certification>(input);
            certification.UserId = UserId;

            await _certificationRepo.Add(certification);

            return Ok();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Trainer")]
        public async Task<IActionResult> DeleteCert(int id)
        {
            bool success = await _certificationRepo.Delete(cert => cert.UserId == UserId && cert.Id == id);

            if(success)
            {
                return Ok();
            }

            return BadRequest("Certificate does not exist");
        }


        [HttpGet("list")]

        public async Task<IActionResult> GetCertificationsForUser(int userId, int pageNumber, int pageSize = Constants.Paging.DefaultPageSize)
        {
            if(pageSize > Constants.Paging.MaxPageSize)
            {
                return BadRequest($"The maximum page size is {Constants.Paging.MaxPageSize}");
            }


            ApplicationUser user = await _userManager.FindByIdAsync(userId.ToString());
            if(user == null)
            {
                return BadRequest("User does not exist");
            }

            if(!user.IsTrainer.HasValue || !user.IsTrainer.Value)
            {
                return BadRequest("Invalid trainer ID");
            }

            int skip = (pageNumber - 1) * pageSize;
            List<Certification> userCertifications = await _certificationQuery.Get(cert => cert.UserId == userId, null, ord => ord.Id, true, skip, pageSize);

            var certsToReturn = _mapper.Map<IEnumerable<CertificationForReturnDto>>(userCertifications);

            return Ok(certsToReturn);
        }
    }
}
