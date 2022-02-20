using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeSite.Data.Model
{
    public class Dht11_datamodel
    {
        public int Id { get; set; }
        public long RegistredDateTime { get; set; }
        public decimal Temperature { get; set; }
        public decimal Humidity { get; set; }
    }
}
