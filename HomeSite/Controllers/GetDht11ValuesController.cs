using HomeSite.Data.EF;
using HomeSite.Data.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeSite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetDht11ValuesController : ControllerBase
    {
        // GET api/GetDht11Values/last
        [HttpGet("last")]
        public ActionResult<decimal> GetLast()
        {
            Dht11RepEF rep = new Dht11RepEF();
            var lastvalue = rep.GetLastSensorValue();
            if (lastvalue == null)
                return NotFound();
            return new ObjectResult(lastvalue);
        }
        // GET api/GetDht11Values/startTicks/finishTicks
        [HttpGet("{startTicks}/{finishTicks}")]
        public ActionResult<List<Dht11_datamodel>> GetList(long startTicks, long finishTicks)
        {
            Dht11RepEF rep = new Dht11RepEF();
            var listvalues = rep.GetListSensorValues(startTicks, finishTicks);
            if (listvalues == null)
                return NotFound();
            return new ObjectResult(listvalues);
        }
    }
}
