using FindTrainer.Domain.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FindTrainer.Persistence.Common
{
    public class Repository<TEntity> where TEntity : class, IEntity
    {
        private readonly DataContext _context;

        private readonly DbSet<TEntity> _dbSet;

        public Repository(DataContext context)
        {
            _context = context;
            _dbSet = _context.Set<TEntity>();
        }

        public DbSet<TEntity> DataSet => _dbSet;

        public async Task<TEntity> Get(int Id)
        {
            TEntity record = await _dbSet.SingleOrDefaultAsync(record => record.Id == Id);

            return record;
        }


        public async Task<TEntity> Get(int Id, params Expression<Func<TEntity, object>>[] includeProperties)
        {
            IQueryable<TEntity> queryPart = _dbSet.Where(record => record.Id == Id);

            foreach (Expression<Func<TEntity, object>> inc in includeProperties)
            {
                queryPart.Include(inc);
            }

            return await queryPart.SingleOrDefaultAsync();
        }

        public async Task<List<TEntity>> Get(Expression<Func<TEntity, bool>> where, params Expression<Func<TEntity, object>>[] includeProperties)
        {
            IQueryable<TEntity> queryPart = _dbSet.Where(where);

            foreach (Expression<Func<TEntity, object>> inc in includeProperties)
            {
                queryPart.Include(inc);
            }

            return await queryPart.ToListAsync();
        }

        public async Task Add(TEntity record)
        {
            await _dbSet.AddAsync(record);
        }

        public async Task<bool> Delete(int id)
        {
            TEntity record = await Get(id);

            if (record != null)
            {
                _dbSet.Remove(record);

                return true;
            }

            return false;
        }

        public async Task<bool> Delete(Expression<Func<TEntity, bool>> where)
        {
            List<TEntity> records = await Get(where);

            if(records != null && records.Count > 0)
            {
                _dbSet.RemoveRange(records);

                return true;
            }

            return false;
        }
    }
}
