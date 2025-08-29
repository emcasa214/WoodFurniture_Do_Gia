using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WoodFurniture.Models;
using WoodFurniture.Services;
namespace WoodFurniture.Controllers
{
	[Authorize]
	[ApiController]
	[Route("[controller]")]
	public class OrderProductController : ControllerBase
	{
		private readonly OrderProductService _service;
		public OrderProductController(OrderProductService service)
		{
			_service = service;
		}
		[HttpPost("add")]
		public IActionResult Add([FromBody] SanPhamDonHang spdh)
		{
			if (spdh == null)
				return BadRequest(new { success = false, message = "Invalid data." });
			try
			{
				_service.Add(spdh);
				return Ok(new { success = true, spdh });
			}
			catch (Exception ex)
			{
				return BadRequest(new { success = false, message = ex.Message });
			}
		}

		// Thêm sản phẩm vào đơn hàng theo id đơn hàng
		[HttpPost("add-to-order/{orderId}")]
		public IActionResult AddToOrder(int orderId, [FromBody] SanPhamDonHang spdh)
		{
			if (spdh == null)
				return BadRequest(new { success = false, message = "Invalid data." });
			try
			{
				spdh.DonHangId = orderId; // Gán id đơn hàng cho sản phẩm đơn hàng
				_service.Add(spdh);
				return Ok(new { success = true, spdh });
			}
			catch (Exception ex)
			{
				return BadRequest(new { success = false, message = ex.Message });
			}
		}
		[HttpPut("edit/{id}")]
		public IActionResult Edit(int id, [FromBody] SanPhamDonHang spdh)
		{
			if (spdh == null || spdh.Id != id)
				return BadRequest(new { success = false, message = "Invalid data." });
			try
			{
				_service.Update(spdh);
				return Ok(new { success = true, spdh });
			}
			catch (Exception ex)
			{
				return BadRequest(new { success = false, message = ex.Message });
			}
		}
		[HttpDelete("delete/{id}")]
		public IActionResult Delete(int id)
		{
			try
			{
				var deleted = _service.Delete(id);
				if (deleted)
					return Ok(new { success = true, message = "Deleted successfully." });
				else
					return NotFound(new { success = false, message = "Not found." });
			}
			catch (Exception ex)
			{
				return BadRequest(new { success = false, message = ex.Message });
			}
		}
	}
}
