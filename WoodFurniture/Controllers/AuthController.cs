using Microsoft.AspNetCore.Mvc;
using WoodFurniture.Services;

namespace WoodFurniture.Controllers
{
    [ApiController]
    [Route("admin/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            var userDto = _authService.Login(loginDto);
            if (userDto == null)
            {
                return Unauthorized("Invalid username or password.");
            }
            return Ok(userDto);
        }
    }
}