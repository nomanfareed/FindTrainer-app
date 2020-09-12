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
    public class CertController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IGenericRepository<Certification> _genCertificationRepo;
        private readonly IFindTrainerRepository _repo;
        private readonly IGenericRepository<User> _genUserRepo;
        public CertController(IFindTrainerRepository repo, IGenericRepository<User> genRepoUser, IMapper mapper, IGenericRepository<Certification> genRepoCertification)
        {
            _mapper = mapper;
            _genCertificationRepo = genRepoCertification;
            _genUserRepo = genRepoUser;
            _repo = repo;
        }
        [Authorize]
        [ServiceFilter(typeof(LogUserActivity))]
        [HttpPost]
        public async Task<IActionResult> AddCert(CertificationForCreationDto certificationForCreationDto)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var user = await _genUserRepo.GetByIdAsync(userId);

            if (user == null)
                return Unauthorized();
            var Cert = _mapper.Map<Certification>(certificationForCreationDto);
            Cert.UserId = userId;

            _genCertificationRepo.Add(Cert);

            if (await _genCertificationRepo.SaveAll())
                return Ok();

            return BadRequest("Failed to add certification");
        }
        [ServiceFilter(typeof(LogUserActivity))]
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCert(Guid id)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var user = await _genUserRepo.GetByIdAsync(userId);

            var Cert = await _genCertificationRepo.GetByIdAsync(id);

            if (user == null || Cert.UserId != userId)
                return Unauthorized();

            _genCertificationRepo.Delete(Cert);

            if (await _genCertificationRepo.SaveAll())
                return Ok();

            return BadRequest("Failed to Delete certification");
        }

        [HttpGet]
        public async Task<IActionResult> GetCertificationsForUser([FromQuery] CertParams certParams)
        {
            var user = await _genUserRepo.GetByIdAsync(certParams.UserId);

            if (user == null)
            {
                return BadRequest("Invalid Trainer");
            }
            if (user.IsTrainer == false)
            {
                return BadRequest("You have to be a Trainer");
            }

            var certs = await _repo.GetCertificationsForUser(certParams);

            var certsToReturn = _mapper.Map<IEnumerable<CertificationForReturnDto>>(certs);

            Response.AddPagination(certs.CurrentPage, certs.PageSize,
                 certs.TotalCount, certs.TotalPages);

            return Ok(certsToReturn);
        }
    }
}