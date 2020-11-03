using System;

namespace FindTrainer.Domain.Exceptions
{
    public class GlobalException : Exception
    {
        public GlobalException( Exception ex)
            : base($"Opss somthing is realy wrong ! ", ex)
        {
        }
    }
}
