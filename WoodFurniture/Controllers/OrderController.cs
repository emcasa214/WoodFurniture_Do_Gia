using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WoodFurniture.Models;

namespace WoodFurniture.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public IActionResult GetAllOrders()
        {
            var orders = _orderService.GetAllOrderForTable();
            if (orders == null || !orders.Any())
            {
                return NotFound(new { message = "No orders found." });
            }
            return Ok(orders);
        }
        [HttpPost("add")]
        public IActionResult AddOrder([FromBody] DonHang order)
        {
            try
            {
                if (order == null)
                {
                    return BadRequest(new { success = false, message = "Invalid order data." });
                }

                _orderService.Add(order);

                return CreatedAtAction(nameof(GetAllOrders), new { id = order.Id }, new { success = true, order });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }
        [HttpPut("edit/{id}")]
        public IActionResult UpdateOrder(int id, [FromBody] DonHang order)
        {
            if (order == null || order.Id != id)
            {
                return BadRequest(new { success = false, message = "Invalid order data." });
            }

            try
            {
                _orderService.Update(order);
                return Ok(new { success = true, order });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }
        [HttpDelete("delete/{id}")]
        public IActionResult DeleteOrder(int id)
        {
            try
            {
                var deleted = _orderService.Delete(id); // truyền id, không truyền DTO
                if (deleted)
                    return Ok(new { success = true, message = "Order deleted successfully." });
                else
                    return NotFound(new { success = false, message = "Order not found." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }
    }
    
}