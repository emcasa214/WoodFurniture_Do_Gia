using WoodFurniture.Models;

public class PaymentRepository
{
    private readonly WoodFurnitureContext _context;

    public PaymentRepository(WoodFurnitureContext context)
    {
        _context = context;
    }

    public IEnumerable<PhuongThucThanhToan> GetAll()
    {
        return _context.PhuongThucThanhToans.ToList();
    }
}