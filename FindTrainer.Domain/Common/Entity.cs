using System;

namespace FindTrainer.Domain.Common
{
    public  abstract class Entity : IEntity
    {
        public int Id { get; set; }
    }

    public interface IEntity
    {
        int Id { get; set; }
    }
}
