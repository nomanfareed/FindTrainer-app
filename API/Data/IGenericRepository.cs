using System;
using System.Linq;
using System.Threading.Tasks;
using API.Models;


namespace API.Data
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(Guid id);
        Task<IQueryable<T>> ListAllAsync();
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task<bool> SaveAll();
    }
}