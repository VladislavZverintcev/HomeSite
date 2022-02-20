using HomeSite.Data.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HomeSite.Config;

namespace HomeSite.Data.EF
{
    class DBcontextEF : DbContext
    {
        string connectionString;
        public DBcontextEF()
        {
            ConfigWorker cw = new ConfigWorker();
            ConfigData config = cw.GetConfig();
            connectionString = config.DBConnectionString;
            Database.EnsureCreated();
        }
        public DbSet<Model.Dht11_datamodel> SensValues { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(connectionString);
        }
    }
}
