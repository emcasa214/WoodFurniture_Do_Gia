using Microsoft.AspNetCore.Mvc;
using WoodFurniture.Models;

namespace WoodFurniture.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AddressController : ControllerBase
    {
        private readonly AddressService _addressService;

        public AddressController(AddressService addressService)
        {
            _addressService = addressService;
        }

        [HttpGet]
        public IActionResult GetAllAddresses()
        {
            var addresses = _addressService.GetAllAddresses();
            if (addresses == null || !addresses.Any())
            {
                return NotFound(new { message = "No addresses found." });
            }
            return Ok(addresses);
        }
        [HttpGet("cusId/{id}")]
        public IActionResult GetAddressesForId(int id)
        {
            var addresses = _addressService.GetAddressesForId(id);
            Console.WriteLine("hello" + addresses);
            if (addresses == null || !addresses.Any())
            {
                return NotFound(new { message = "No addresses found." });
            }
            return Ok(addresses);
        }

        [HttpPost("add")]
        public IActionResult AddAddress([FromBody] DiaChi address)
        {
            try
            {
                if (address == null)
                {
                    return BadRequest(new { success = false, message = "Invalid address data." });
                }

                _addressService.AddAddress(address);
                return CreatedAtAction(nameof(GetAllAddresses), new { id = address.Id }, new { success = true, address });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        [HttpPut("edit/{id}")]
        public IActionResult UpdateAddress(int id, [FromBody] DiaChi address)
        {
            if (address == null || address.Id != id)
            {
                return BadRequest(new { success = false, message = "Invalid address data." });
            }

            try
            {
                _addressService.UpdateAddress(address);
                return Ok(new { success = true, address });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }
    }
}