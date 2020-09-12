using API.Data;
using API.Models;
using FindTrainerApp.API.DataServices.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace FindTrainerApp.API.DataServices.Implementation
{
    internal class UserService : GenericRepository<User>, IUserService
    {
        protected readonly DataContext _context;
        public UserService(DataContext context) : base(context)
        {
            _context = context;
        }

        // here we simply override our generic repository's delete function
        public override void Delete(User entity)
        {
            // creating a transaction
            using (var t = _context.Database.BeginTransaction())
            {
                try
                {
                    // we write all our logic in a transaction
                    User user = _context.Users.Include(x => x.Address)
                        .Include(x => x.Focus)
                        .Include(x => x.Certifications)
                        .Include(x => x.ReviewsReceived)
                        .Include(x => x.ReviewsSend)
                        .Include(x => x.Profile)
                        .AsNoTracking().FirstOrDefault(x => x.Id == entity.Id);
                    Address addresses = user.Address;
                    List<Focus> foucs = user.Focus.ToList();
                    List<Certification> certs = user.Certifications.ToList();
                    List<Review> reviews = user.ReviewsReceived.ToList();
                    List<Review> revsent = user.ReviewsSend.ToList();
                    Photo profile = user.Profile;


                    _context.Users.Remove(user); // remove the user first so all the dependent entities aren't effected when deleting.
                    _context.SaveChanges();

                    if (addresses != null)
                    {
                        _context.Addresses.Remove(_context.Addresses.FirstOrDefault(x => x.Id == addresses.Id));
                        _context.SaveChanges();
                    }

                    if (foucs.Count() > 0)
                    {
                        _context.Focus.RemoveRange(foucs);
                    }
                    if (certs.Count > 0)
                    {
                        _context.Certifications.RemoveRange(certs);
                    }

                    if (revsent.Count > 0)
                    {
                        _context.Reviews.RemoveRange(reviews);
                    }

                    if (revsent.Count > 0)
                    {
                        _context.Reviews.RemoveRange(revsent);
                    }

                    if (profile != null)
                    {
                        _context.Photos.RemoveRange(profile);
                    }
                    _context.SaveChanges();

                    t.Commit(); // commits all the changes to database in 1 go if no exceptions were thrown
                }
                catch (Exception ex)
                {
                    t.Rollback(); // if any exception occurs, the transaction will be rolled back, and database will be left in a consistent state(as it was before)
                    Debug.WriteLine(ex.Message);
                }
            }
        }
    }
}
