using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WoodFurniture.Models;

namespace WoodFurniture.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductController(ProductService productService)
        {
            _productService = productService;
        }
        [HttpGet]
        public IActionResult GetAllProduct()
        {
            var listP = _productService.GetAllProductsForTableAdmin();
            if (listP == null || !listP.Any())
            {
                return NotFound(new { message = "No products found." });
            }
            return Ok(listP);
        }

        [HttpPost("add")]
        public IActionResult AddProduct([FromBody] SanPham sp)
        {
            try
            {
                var adminIdClaim = User.Claims.FirstOrDefault(c => c.Type == "id" || c.Type == "AdminId")
                                ?? User.Claims.FirstOrDefault(c => c.Type == "nameid")
                                ?? User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier);
                if (adminIdClaim != null && int.TryParse(adminIdClaim.Value, out int adminId))
                {
                    sp.AdminId = adminId;
                }
                else
                {
                    return Unauthorized(new { success = false, message = "Không xác định được AdminId." });
                }
                Console.WriteLine($"AdminId: {sp.AdminId}");

                var created = _productService.AddProduct(sp);
                // Kiểm tra xem đối tượng vừa thêm có Id hợp lệ không (Id > 0)
                if (created == null || created.Id <= 0)
                    return StatusCode(500, new { success = false, message = "Add failed." });

                return CreatedAtAction(nameof(GetAllProduct), new { id = created.Id }, new { success = true, product = created });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        [HttpPut("edit/{id}")]
        public IActionResult EditProduct(int id, [FromBody] SanPham sp)
        {
            Console.WriteLine($"id cua san pham can sua: {id}");
            try
            {
                sp.Id = id;
                Console.WriteLine($"id cua san pham can sua: {sp.Id}");

                var adminIdClaim = User.Claims.FirstOrDefault(c => c.Type == "id" || c.Type == "AdminId")
                                ?? User.Claims.FirstOrDefault(c => c.Type == "nameid")
                                ?? User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier);
                if (adminIdClaim != null && int.TryParse(adminIdClaim.Value, out int adminId))
                {
                    sp.AdminId = adminId;
                }
                else
                {
                    return Unauthorized(new { success = false, message = "Không xác định được AdminId." });
                }

                var updated = _productService.UpdateProduct(sp);
                Console.WriteLine($"San pham:  {updated.TenSp}");
                return Ok(new { success = true, product = updated });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var res = _productService.DeleteProduct(id);
            if (!res)
            {
                return NotFound(new { success = false, message = "Product not found." });
            }
            return Ok(new { success = true, message = "Product deleted successfully." });
        }

    }
    
}