using HomeSite.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeSite.Data.EF
{
    public class Dht11RepEF : ISensorRepDht11
    {
        public bool CheckConnection()
        {
            using (var context = new DBcontextEF())
            {
                if (context.Database.CanConnect())
                { return true; }
                else { return false; }
            }
        }

        public Dht11_datamodel GetLastSensorValue()
        {
            try
            {
                using (var context = new DBcontextEF())
                {
                    //int max = context.SensValues.Max(p => p.Id);
                    //var dht11values = context.SensValues.Where(c => c.Id == max).FirstOrDefault();
                    var dht11values = context.SensValues.OrderByDescending(i => i.RegistredDateTime).First();
                    return dht11values;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Dht11_datamodel> GetListSensorValues(long startTicks, long finishTicks)
        {
            try
            {
                using (var context = new DBcontextEF())
                {
                    var dht11values = context.SensValues.Where(c => c.RegistredDateTime >= startTicks && c.RegistredDateTime <= finishTicks).ToList();
                    return dht11values;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
