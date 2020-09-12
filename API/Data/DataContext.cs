using API.Models;
using Microsoft.EntityFrameworkCore;
//add a new migration: dotnet ef migrations add AddUserAndFeatures
//Update Database: dotnet ef database update
namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Certification> Certifications { get; set; }
        public DbSet<Focus> Focus { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Review>()
                  .HasOne(u => u.Sender)
                  .WithMany(m => m.ReviewsSend)
                  .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Review>()
                  .HasOne(u => u.Recipient)
                  .WithMany(m => m.ReviewsReceived)
                  .OnDelete(DeleteBehavior.Cascade);

            // no need for this anymore
            //builder.Entity<User>()
            //     .HasOne(u => u.Address)
            //     .WithOne(m => m.User)
            //     .HasForeignKey<Address>(x => x.UserId)
            //     .OnDelete(DeleteBehavior.Cascade);
        }
    }
}