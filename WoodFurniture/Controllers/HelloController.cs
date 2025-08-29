using Microsoft.AspNetCore.Mvc;

namespace WoodFurniture.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HelloController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        => Ok("Hello World!");

        [HttpGet("meo")]
        public IActionResult GetMeo()
        => Ok("Meo xinh");
    }
}