
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using FindTrainer.Application.Dtos;
using FindTrainer.Domain.Entities;
using FindTrainer.Domain.Entities.Security;
using FindTrainer.Persistence.Common;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using System.Net.NetworkInformation;
using System.Threading.Tasks;

namespace FindTrainer.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ApplicationController
    {
        private readonly ReadOnlyQuery<Photo> _photoQuery;
        private readonly Repository<Photo> _photoRepo;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        private Cloudinary _cloudinary;

        public PhotosController(ReadOnlyQuery<Photo> photoQuery,
                                UserManager<ApplicationUser> userManager,
                                IMapper mapper,
                                Cloudinary cloudinary,
                                Repository<Photo> photoRepo)
        {
            _photoQuery = photoQuery;
            _userManager = userManager;
            _mapper = mapper;
            _cloudinary = cloudinary;
            _photoRepo = photoRepo;
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photo = await _photoQuery.Get(id);
            if (photo == null)
            {
                return NotFound();
            }

            var photoDto = _mapper.Map<PhotoForReturnDto>(photo);

            return Ok(photoDto);
        }


        [HttpPost("Add")]

        public async Task<IActionResult> AddPhotoForUser([FromForm] PhotoForCreationDto photoForCreationDto)
        {
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

            photoForCreationDto.Url = uploadResult.Url.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            ApplicationUser currentUser = await _userManager.FindByIdAsync(UserId.ToString());
            currentUser.Photo = photo;
            await _userManager.UpdateAsync(currentUser);

            var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
            
            
            return CreatedAtRoute("GetPhoto", new { userId = UserId, id = photo.Id }, photoToReturn);
            
        }

    }
}
