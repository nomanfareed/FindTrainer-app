using FindTrainer.Domain.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FindTrainer.Persistence.Common
{
    public class ReadOnlyQuery<TEntity> where TEntity : class, IEntity
    {
        private readonly DataContext _context;

        private readonly IQueryable<TEntity> _query;

        public ReadOnlyQuery(DataContext context)
        {
            _context = context;
            _query = _context.Set<TEntity>().AsNoTracking();
        }


        public IQueryable<TEntity> Query => _query;

        public async Task<TEntity> Get(int Id)
        {
            TEntity record = await _query.SingleOrDefaultAsync(record => record.Id == Id);

            return record;
        }


        public async Task<TEntity> Get(int Id, params Expression<Func<TEntity, object>>[] includeProperties)
        {
            IQueryable<TEntity> queryPart = _query.Where(record => record.Id == Id);

            foreach(Expression<Func<TEntity, object>> inc in includeProperties)
            {
                queryPart.Include(inc);
            }

            return await queryPart.SingleAsync();
        }

        public async Task<List<TEntity>> Get(Expression<Func<TEntity, bool>> where,Expression<Func<TEntity, object>>[] includeProperties = null,
                                             Expression<Func<TEntity, object>> ordering = null, bool asyn = true, int? skip = null, int? take = null)
        {
            IQueryable<TEntity> queryPart = _query.Where(where);

            if(includeProperties != null && includeProperties.Length > 0)
            {
                foreach (Expression<Func<TEntity, object>> inc in includeProperties)
                {
                    queryPart = queryPart.Include(inc);
                }
            }

            if(ordering != null && asyn)
            {
                queryPart = queryPart.OrderBy(ordering);
            }
            if (ordering != null && !asyn)
            {
                queryPart = queryPart.OrderByDescending(ordering);
            }

            if(ordering != null && take.HasValue && skip.HasValue)
            {
                queryPart.Skip(skip.Value).Take(take.Value);
            }

            return await queryPart.ToListAsync();
        }

    }
}
