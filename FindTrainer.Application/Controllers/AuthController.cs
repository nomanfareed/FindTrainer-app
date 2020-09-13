using FindTrainer.Application.Dtos;
using FindTrainer.Domain.Entities.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FindTrainer.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ApplicationController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _config;

        public AuthController(UserManager<ApplicationUser> userManager,
                              SignInManager<ApplicationUser> signInManager,
                              IConfiguration config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] UserForRegisterDto input)
        {
            ApplicationUser existingUser = await  _userManager.FindByNameAsync(input.Username);
            if(existingUser != null)
            {
                return BadRequest("Username already exists");
            }

            var newUser = new ApplicationUser()
            {
                Created = DateTime.Now,
                LastActive = DateTime.Now,
                UserName = input.Username,
            };

             IdentityResult userCreationResult = await _userManager.CreateAsync(newUser, input.Password);

            if(!userCreationResult.Succeeded)
            {
                IdentityError userCreationError = userCreationResult.Errors.First();
                return BadRequest(userCreationError.Description);
            }

            return Ok();
        }


        [HttpPost("login")]
        [AllowAnonymous()]
        public async Task<IActionResult> Login([FromBody] UserForLoginDto input)
        {
            var signInResult = await _signInManager.PasswordSignInAsync(input.Username, input.Password, isPersistent: false, lockoutOnFailure: false);

            if(!signInResult.Succeeded)
            {
                return BadRequest("Wrong username or password");
            }

            ApplicationUser loggedinUser = await _userManager.FindByNameAsync(input.Username);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, loggedinUser.Id.ToString()),
                new Claim(ClaimTypes.Name, loggedinUser.UserName)
            };

            JwtSecurityToken token = GenerateToken(claims);

            var result = new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo
            };


            return Ok(result);
        }

        private JwtSecurityToken GenerateToken(IEnumerable<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecurityKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds
            );

            return token;
        }
    }
}
