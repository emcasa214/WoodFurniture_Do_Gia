using WoodFurniture.Models;

public class PaymentService
{
    private readonly PaymentRepository _paymentRepository;

    public PaymentService(PaymentRepository paymentRepository)
    {
        _paymentRepository = paymentRepository;
    }

    public IEnumerable<PhuongThucThanhToan> GetAllPayments()
    {
        return _paymentRepository.GetAll();
    }
}