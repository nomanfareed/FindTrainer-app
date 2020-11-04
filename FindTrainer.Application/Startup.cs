using AutoMapper;
using FindTrainer.Application.Dtos;
using FindTrainer.Application.Middleware;
using FindTrainer.Domain.Entities;
using FindTrainer.Domain.Entities.Security;
using FindTrainer.Persistence;
using FindTrainer.Persistence.Common;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindTrainer.Application
{
    public class Startup
    {
        private UserManager<ApplicationUser> _userManager;
        private RoleManager<ApplicationRole> _roleManager;
        private IServiceProvider _serviceProvider;


        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Startup));
            services.AddControllers();

            services.AddDbContext<DataContext>(options =>
                     options.UseSqlite("Data Source=FindTrainerData.db"));

            services.AddCors();

            services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
            {
                options.User.RequireUniqueEmail = true;
                options.SignIn.RequireConfirmedEmail = false;
                options.User.AllowedUserNameCharacters = "";
                options.Tokens.PasswordResetTokenProvider = TokenOptions.DefaultEmailProvider;
                options.Tokens.EmailConfirmationTokenProvider = TokenOptions.DefaultEmailProvider;

            })
    .AddRoles<ApplicationRole>()
    .AddDefaultTokenProviders()
    .AddEntityFrameworkStores<DataContext>();

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.ClaimsIssuer = Configuration["Jwt:Issuer"];
                options.Audience = Configuration["Jwt:Audience"];
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Audience"],
                    IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:SecurityKey"])),
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    RequireExpirationTime = true,
                    NameClaimType = "Roles"
                };
            });



            services.AddScoped(typeof(ReadOnlyQuery<>));
            services.AddScoped(typeof(Repository<>));


            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo() { Title = "Find Trainer API", Version = "v1" });
                c.AddSecurityDefinition("Bearer",
                    new Microsoft.OpenApi.Models.OpenApiSecurityScheme()
                    {
                        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                        Description = "Please enter into field the word 'Bearer' following by space and JWT",
                        Name = "Authentication",
                        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey
                    });

            });

            services.AddCors();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            app.UseMiddleware<AutoSaveMiddleware>();
            app.UseMiddleware<ErrorHandlingMiddleware>();

            app.UseCors(x => x.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseAuthorization();


            app.UseSwagger();



            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Find Trainer API V1");
            });

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            PerpareIfFirstRun().Wait();
        }


        private async Task PerpareIfFirstRun()
        {
            _userManager = (UserManager<ApplicationUser>)_serviceProvider.GetService(typeof(UserManager<ApplicationUser>));
            _roleManager = (RoleManager<ApplicationRole>)_serviceProvider.GetService(typeof(RoleManager<ApplicationRole>));
            if (_userManager.Users.Count() == 0)
            {

                await SeedRoles();
                await SeedUsers();
            }
        }

        private async Task SeedUsers()
        {
            var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<UserDataModel>>(userData);
            foreach (var user in users)
            {
                var appUser = new ApplicationUser()
                {
                    AdsBidding = user.AdsBidding,
                    Created = DateTime.Now,
                    Gender = (int)user.Gender,
                    IsTrainer = user.IsTrainer,
                    Introduction = user.Introduction,
                    Email = user.Email,
                    UserName = user.Email,
                    KnownAs = user.KnownAs,
                };


                await _userManager.CreateAsync(appUser, user.Password);
                if (appUser.IsTrainer.HasValue && appUser.IsTrainer.Value)
                {
                    await _userManager.AddToRoleAsync(appUser, Constants.Roles.Trainer);
                }
                else
                {
                    await _userManager.AddToRoleAsync(appUser, Constants.Roles.User);
                }

                var usersRepo = (Repository<ApplicationUser>)_serviceProvider.GetService(typeof(Repository<ApplicationUser>));

                ApplicationUser userToUpdate = await usersRepo.DataSet.Where(x => x.Email == user.Email)
                                                                 .Include(x => x.Address)
                                                                 .Include(x => x.Photo)
                                                                 .Include(x => x.Certifications)
                                                                 .Include(x => x.ApplicationUserFocuses)
                                                                 .ThenInclude(x => x.Focus)
                                                                 .SingleAsync();

                userToUpdate.Address = user.Address;
                userToUpdate.Photo = user.Profile;
                userToUpdate.Certifications = user.Certifications;
                userToUpdate.Created = user.Created;
                userToUpdate.LastActive = user.LastActive;


                if (user.Focus != null && user.Focus.Count() > 0)
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

            await _userManager.CreateAsync(new ApplicationUser()
            {
                Email = "admin@test.com",
                UserName = "admin@test.com"
            }, "P@ssw0rd");

            var admin = await _userManager.FindByEmailAsync("admin@test.com");
            await _userManager.AddToRoleAsync(admin, Constants.Roles.Admin);
        }

        private async Task SeedRoles()
        {
            IdentityResult result = await _roleManager.CreateAsync(new ApplicationRole() { Name = Constants.Roles.Admin, NormalizedName = Constants.Roles.Admin });

            if(!result.Succeeded)
            {
                throw new Exception("Failed to seed roles");
            }

            result = await _roleManager.CreateAsync(new ApplicationRole() { Name = Constants.Roles.User, NormalizedName = Constants.Roles.User });
            if (!result.Succeeded)
            {
                throw new Exception("Failed to seed roles");
            }

            result = await _roleManager.CreateAsync(new ApplicationRole() { Name = Constants.Roles.Trainer, NormalizedName = Constants.Roles.Trainer });

            if (!result.Succeeded)
            {
                throw new Exception("Failed to seed roles");
            }
        }
    }
}
