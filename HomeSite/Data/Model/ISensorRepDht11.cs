using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace HomeSite.Data.Model
{
    interface ISensorRepDht11
    {
        bool CheckConnection();
        Dht11_datamodel GetLastSensorValue();
        List<Dht11_datamodel> GetListSensorValues(long startTicks, long finishTicks);
    }
}
