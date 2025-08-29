using Microsoft.AspNetCore.Mvc;

namespace WoodFurniture.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly PaymentService _paymentService;

        public PaymentController(PaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpGet]
        public IActionResult GetAllPayments()
        {
            var payments = _paymentService.GetAllPayments();
            if (payments == null || !payments.Any())
            {
                return NotFound(new { message = "No payments found." });
            }
            return Ok(payments);
        }
    }
}