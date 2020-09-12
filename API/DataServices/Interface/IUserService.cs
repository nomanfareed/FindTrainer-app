using API.Data;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FindTrainerApp.API.DataServices.Interface {
    public interface IUserService: IGenericRepository<User> {
        // here we can define some user specific methods
    }
}
