using FindTrainer.Application.Dtos;
using FindTrainer.Domain.Entities;
using FindTrainer.Domain.Entities.Security;
using FindTrainer.Persistence.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
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
        private readonly Repository<ApplicationUser> _usersRepo;

        public AuthController(UserManager<ApplicationUser> userManager,
                              SignInManager<ApplicationUser> signInManager,
                              Repository<ApplicationUser> usersRepo,
                              IConfiguration config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _usersRepo = usersRepo;
            _config = config;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] UserForRegisterDto input)
        {
            ApplicationUser existingUser = await _userManager.FindByNameAsync(input.Username);
            if (existingUser != null)
            {
                return BadRequest(new { Message = "Username already exists" });
            }

            var newUser = new ApplicationUser()
            {
                Created = DateTime.Now,
                LastActive = DateTime.Now,
                UserName = input.Username,
            };

            IdentityResult userCreationResult = await _userManager.CreateAsync(newUser, input.Password);

            if (!userCreationResult.Succeeded)
            {
                IdentityError userCreationError = userCreationResult.Errors.First();
                return BadRequest(userCreationError.Description);
            }

            newUser = await _userManager.FindByNameAsync(newUser.UserName);
            await _userManager.AddToRoleAsync(newUser, Constants.Roles.User);

            return Ok();
        }


        [HttpPost("login")]
        [AllowAnonymous()]
        public async Task<IActionResult> Login([FromBody] UserForLoginDto input)
        {
            await PerpareIfFirstRun();
            var signInResult = await _signInManager.PasswordSignInAsync(input.Username, input.Password, isPersistent: false, lockoutOnFailure: false);

            if (!signInResult.Succeeded)
            {
                return BadRequest("Wrong username or password");
            }
            var claims = await GetUserClaims(input.Username);

            JwtSecurityToken token = GenerateToken(claims);

            var result = new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo
            };


            return Ok(result);
        }

        private async Task<List<Claim>> GetUserClaims(string userName)
        {
            ApplicationUser usr = await _userManager.FindByNameAsync(userName);
            IList<string> roles = await _userManager.GetRolesAsync(usr);

            List<Claim> claims = roles.Select(r => new Claim("Role", r)).ToList();

            claims.Add(new Claim(ClaimTypes.NameIdentifier, usr.Id.ToString()));
            claims.Add(new Claim(ClaimTypes.Name, usr.UserName));

            return claims;
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

        private async Task PerpareIfFirstRun()
        {
            if (_userManager.Users.Count() == 0)
            {
                await SeedUsers();
            }
        }

        public async Task SeedUsers()
        {
            var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<UserDataModel>>(userData);
            foreach (var user in users)
            {
                var appUser = new ApplicationUser()
                {
                    AdsBidding = user.AdsBidding,
                    Created = DateTime.Now,
                    Gender = user.Gender,
                    IsTrainer = user.IsTrainer,
                    Introduction = user.Introduction,
                    UserName = user.Username,
                    KnownAs = user.KnownAs,
                };


                await _userManager.CreateAsync(appUser, "P@ssw0rd");
                ApplicationUser userToUpdate = await _usersRepo.DataSet.Where(x => x.UserName == user.Username)
                                                                 .Include(x => x.Address)
                                                                 .Include(x => x.Photo)
                                                                 .Include(x => x.Certifications)
                                                                 .Include(x => x.ApplicationUserFocuses)
                                                                 .ThenInclude(x => x.Focus)
                                                                 .SingleAsync();

                userToUpdate.Address = user.Address;
                userToUpdate.Photo = user.Profile;
                userToUpdate.Certifications = user.Certifications;
                

                if(user.Focus != null && user.Focus.Count() > 0)
                {
                    foreach (var f in user.Focus)
                    {
                        var appFocus = new ApplicationUserFocus()
                        {
                            Focus = new Focus()
                            {
                                Name = f.Name
                            }
                        };

                        userToUpdate.ApplicationUserFocuses.Add(appFocus);
                    }
                }
            }
        }
    }
}
