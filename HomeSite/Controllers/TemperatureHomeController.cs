using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeSite.Controllers
{
    public class TemperatureHomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
