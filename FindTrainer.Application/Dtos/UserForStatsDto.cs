using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FindTrainer.Application.Dtos
{
    public class UserForStatsDto
    {
        public DateTime ViewDate { get; set; }
        public int Count { get; set; }
        public int TrainerId { get; set; }
    }
}
