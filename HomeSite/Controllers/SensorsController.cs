using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HomeSite.Controllers
{
    public class SensorsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
