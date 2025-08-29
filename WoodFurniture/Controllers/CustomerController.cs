using Microsoft.AspNetCore.Mvc;
using WoodFurniture.Models;

namespace WoodFurniture.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerService _customerService;

        public CustomerController(CustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public IActionResult GetAllCustomers()
        {
            var customers = _customerService.GetAllCustomers();
            if (customers == null || !customers.Any())
            {
                return NotFound(new { message = "No customers found." });
            }
            return Ok(customers);
        }

        [HttpPost("add")]
        public IActionResult AddCustomer([FromBody] KhachHang customer)
        {
            try
            {
                if (customer == null)
                {
                    return BadRequest(new { success = false, message = "Invalid customer data." });
                }

                _customerService.AddCustomer(customer);
                return CreatedAtAction(nameof(GetAllCustomers), new { id = customer.Id }, new { success = true, customer });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        [HttpPut("edit/{id}")]
        public IActionResult UpdateCustomer(int id, [FromBody] KhachHang customer)
        {
            if (customer == null || customer.Id != id)
            {
                return BadRequest(new { success = false, message = "Invalid customer data." });
            }

            try
            {
                _customerService.UpdateCustomer(customer);
                return Ok(new { success = true, customer });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }
    }
}