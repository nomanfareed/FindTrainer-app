using FindTrainer.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using FindTrainer.Persistence.Common;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace FindTrainer.Persistence.Repositorys
{
    public class UserMessageRepository : Repository<UserMessage>
    {
        private readonly DataContext _context;

        public UserMessageRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public enum SortTypes
        {
            oldFirst,
            NewFirst,
            Default // first IsNew then old first
        }

        public async Task<List<UserMessage>> SortAndFilterMessage(SortTypes sortType, string titleFilter, string contentFilter , string userNameFilter , string trainerFilter , int? trianerId , int? userId , int pageNumber, int pageSize)
        {
            var query = (from message in _context.UserMessages
                         from user in _context.Users.Where(i => i.Id == message.UserId)
                         from trainer in _context.Users.Where(i => i.Id == message.TrainerId)
                         where
                         (trianerId == null ? true : message.TrainerId == trianerId) &&
                         (userId == null ? true : message.UserId == userId) &&
                         (string.IsNullOrWhiteSpace(titleFilter) ? true : message.Title.Contains(titleFilter)) &&
                         (string.IsNullOrWhiteSpace(contentFilter) ? true : message.Title.Contains(contentFilter)) &&
                         (string.IsNullOrWhiteSpace(userNameFilter) ? true : user.KnownAs.Contains(userNameFilter)) &&
                         (string.IsNullOrWhiteSpace(trainerFilter) ? true : trainer.KnownAs.Contains(userNameFilter))
                         select
                         new UserMessage()
                         {
                             Title = message.Title,
                             Content = message.Content,
                             CreateDateTime = message.CreateDateTime,
                             Email = message.Email,
                             ExpireDateTime = message.ExpireDateTime,
                             Id = message.Id,
                             PhoneNumber = message.PhoneNumber,
                             Trainer = trainer,
                             TrainerId = message.TrainerId,
                             User = user,
                             UserId = message.UserId,
                             VisiteDateTime = message.VisiteDateTime,
                         });

            switch (sortType)
            {
                case SortTypes.oldFirst:
                    query =  query.OrderByDescending(i => i.Id);
                    break;
                case SortTypes.NewFirst:
                    query =  query.OrderBy(i => i.Id);
                    break;
                default:
                    query =  query.OrderBy(i => i.VisiteDateTime == null).OrderByDescending(i => i.Id);
                    break;
            }


            int skip = (pageNumber - 1) * pageSize;
            var finalModel = await query.Skip(skip).Take(pageSize).ToListAsync();

            return finalModel;

        }


        public async Task<int[]> GetLastWeekMessages(int Id)
        {

            int statsDays = 8; int counter = 0;
            int[] arr = new int[statsDays];

            var prevDate = DateTime.Now.AddDays(-statsDays).Date;
            var dataQuery = await _context.UserMessages
                        .Where(x => x.TrainerId == Id && x.CreateDateTime.Date > prevDate)
                        .GroupBy(grp => grp.CreateDateTime.Date)
                        .Select(y => new
                        {
                            Date = y.Key,
                            Count = y.Count()
                        })
                        .ToListAsync();

            var dateTimes = new List<DateTime>();
            for (int i = 0; i < statsDays; i++)
            {
                dateTimes.Add(DateTime.Now.Date.AddDays(-i));
            }

            var emptyTableQuery = from dt in dateTimes
                                  select new
                                  {
                                      dt.Date,
                                      Count = 0
                                  };

            var result = from e in emptyTableQuery
                         join data in dataQuery on e.Date equals data.Date into g
                         from finalData in g.DefaultIfEmpty()
                         select new
                         {
                             TrainerId = Id,
                             ViewDate = e.Date,
                             Count = finalData == null ? 0 : finalData.Count
                         };

            result = result.OrderBy(x => x.ViewDate).ToList();


            foreach (var item in result)
            {
                arr[counter] = item.Count;
                counter++;
            }

            return arr;
        }
    }
}
