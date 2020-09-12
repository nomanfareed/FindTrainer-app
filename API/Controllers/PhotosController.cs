using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using API.Data;
using API.Dtos;
using API.Helpers;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using DatingApp.API.Dtos;
using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace API.Controllers
{
    [Authorize]
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IGenericRepository<Photo> _genRepoPhoto;
        private readonly IGenericRepository<User> _genUserRepo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        public PhotosController(IGenericRepository<User> genRepoUser, IMapper mapper, IGenericRepository<Photo> genRepoPhoto,
            IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
            _genRepoPhoto = genRepoPhoto;
            _genUserRepo = genRepoUser;
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(Guid id)
        {
            var photoFromRepo = await _genRepoPhoto.GetByIdAsync(id);
            if (photoFromRepo == null)
            {
                return NotFound();
            }

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }
        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser([FromForm] PhotoForCreationDto photoForCreationDto)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var users = await _genUserRepo.ListAllAsync();
            var userFromRepo = users.Include(x => x.Profile).FirstOrDefault(x => x.Id == userId);
            if (userFromRepo == null)
                return Unauthorized();

            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            userFromRepo.Profile = photo;

            if (await _genRepoPhoto.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new { userId = userId, id = photo.Id }, photoToReturn);
            };

            return BadRequest("Could not add the photo");
        }


        [HttpDelete]
        public async Task<IActionResult> DeletePhotoForUser()
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var users = await _genUserRepo.ListAllAsync();
            var userFromRepo = users.Include(x => x.Profile).FirstOrDefault(x => x.Id == userId);

            if (userFromRepo == null)
                return Unauthorized();

            if (userFromRepo.Profile.PublicId != null)
            {
                var deleteParams = new DeletionParams(userFromRepo.Profile.PublicId);

                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok")
                {
                    _genRepoPhoto.Delete(userFromRepo.Profile);
                }
            }
            else
            {
                _genRepoPhoto.Delete(userFromRepo.Profile);
            }
            if (await _genRepoPhoto.SaveAll())
            {
                return Ok();
            };
            return BadRequest("Could not delete the photo");
        }
    }
}