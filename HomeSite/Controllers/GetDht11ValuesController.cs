using HomeSite.Data.EF;
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
        // GET api/values/temp
        [HttpGet("temp")]
        public ActionResult<decimal> GetTemp()
        {
            Dht11RepEF rep = new Dht11RepEF();
            var lastvalue = rep.GetLastSensorValue();
            if (lastvalue == null)
                return NotFound();
            return new ObjectResult(lastvalue.Temperature);
        }
        // GET api/values/temp
        [HttpGet("humi")]
        public ActionResult<decimal> GetHumi()
        {
            Dht11RepEF rep = new Dht11RepEF();
            var lastvalue = rep.GetLastSensorValue();
            if (lastvalue == null)
                return NotFound();
            return new ObjectResult(lastvalue.Humidity);
        }
    }
}
