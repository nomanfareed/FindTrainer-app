using FindTrainer.Domain.Common;
using FindTrainer.Domain.Entities;
using FindTrainer.Domain.Entities.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace FindTrainer.Persistence
{
    public class DataContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<ApplicationUserFocus> ApplicationUserFocuses { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Certification> Certifications { get; set; }
        public DbSet<Focus> Focuses { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            ApplyMapping(builder);

        }


        private void ApplyMapping(ModelBuilder builder)
        {

            List<Type> entityTypes = Assembly.Load("FindTrainer.Domain").GetTypes().Where(t => t.IsSubclassOf(typeof(Entity))).ToList();

            foreach (var entType in entityTypes)
            {

                var entityBuilder = builder.Entity(entType);
                entityBuilder.HasKey("Id");

            }

            builder.Entity<ApplicationUser>().Property(x => x.Gender).IsRequired(false);
            builder.Entity<ApplicationUser>().Property(x => x.IsTrainer).IsRequired(false);
            builder.Entity<ApplicationUser>().Property(x => x.KnownAs).IsRequired(false);
            builder.Entity<ApplicationUser>().Property(x => x.Created).IsRequired();
            builder.Entity<ApplicationUser>().Property(x => x.LastActive).IsRequired();
            builder.Entity<ApplicationUser>().Property(x => x.Introduction).IsRequired(false);
            builder.Entity<ApplicationUser>().Property(x => x.AdsBidding).IsRequired(false);
            builder.Entity<ApplicationUser>().HasMany(x => x.ReviewsReceived).WithOne(x => x.RecipientUser).HasForeignKey(x => x.RecipientId);
            builder.Entity<ApplicationUser>().HasMany(x => x.ReviewsSent).WithOne(x => x.Sender).HasForeignKey(x => x.SenderId);

            builder.Entity<Focus>().Property(x => x.Name).IsRequired();

            builder.Entity<ApplicationUserFocus>()
                .HasKey(uf => new { uf.FocusId, uf.UserId });
            builder.Entity<ApplicationUserFocus>()
                .HasOne(x => x.User)
                .WithMany(x => x.ApplicationUserFocuses)
                .HasForeignKey(bc => bc.UserId);
            builder.Entity<ApplicationUserFocus>()
                .HasOne(x => x.Focus)
                .WithMany(x => x.ApplicationUserFocuses)
                .HasForeignKey(x => x.FocusId);

            


            builder.Entity<Address>().Property(x => x.City).IsRequired();
            builder.Entity<Address>().Property(x => x.Country).IsRequired();
            builder.Entity<Address>().Property(x => x.FullAddress).IsRequired();
            builder.Entity<Address>().Property(x => x.Province).IsRequired();

            builder.Entity<ApplicationUser>().HasOne(x => x.Address).WithOne().HasForeignKey<ApplicationUser>(x => x.AddressId);


            builder.Entity<Certification>().Property(x => x.Description).IsRequired();
            builder.Entity<Certification>().Property(x => x.Title).IsRequired();
            builder.Entity<Certification>().Property(x => x.Created).IsRequired();

            builder.Entity<ApplicationUser>().HasMany(x => x.Certifications).WithOne().HasForeignKey(x => x.UserId);

            builder.Entity<Review>().Property(x => x.Content).IsRequired();
            builder.Entity<Review>().Property(x => x.Stars).IsRequired();
            builder.Entity<Review>().Property(x => x.CreatedDate).IsRequired();
            builder.Entity<Review>().Property(x => x.RecipientId).IsRequired();


            builder.Entity<Photo>().Property(x => x.Url).IsRequired();
            builder.Entity<Photo>().Property(x => x.PublicId).IsRequired();

            builder.Entity<ApplicationUser>().HasOne(x => x.Photo).WithOne().HasForeignKey<ApplicationUser>(x => x.PhotoId);
        }

    }
}
