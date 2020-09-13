using Serilog;
using System;

namespace FindTrainer.Application.Utilities
{
    public class Logger
    {
        private const string MessageTemplate = "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] {Message:lj}{NewLine}{Exception}";
        static Logger()
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .WriteTo.File("log.txt", rollingInterval: RollingInterval.Day)
                .CreateLogger();
        }

        public static void Error(Exception exp)
        {
            Serilog.Log.Logger.Error(exp, MessageTemplate);
        }

        public static void Error(string message)
        {
            Serilog.Log.Error(message, MessageTemplate);
        }

        public static void Info(string message)
        {
            Serilog.Log.Information(message, MessageTemplate);
        }
    }
}
