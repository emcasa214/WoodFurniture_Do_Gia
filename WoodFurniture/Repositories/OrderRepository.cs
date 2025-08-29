using WoodFurniture.Models;

public class OrderRepository
{
    private readonly WoodFurnitureContext _context;

    public OrderRepository(WoodFurnitureContext context)
    {
        _context = context;
    }

    public IEnumerable<DonHang> GetAll()
    {
        return _context.DonHangs.ToList();
    }

    public void Add(DonHang order)
    {
        _context.DonHangs.Add(order);
    }

    public void Update(DonHang order)
    {
        _context.DonHangs.Update(order);
    }

    public void Delete(int id)
    {
        var order = _context.DonHangs.FirstOrDefault(o => o.Id == id);
        if (order != null)
        {
            _context.DonHangs.Remove(order);
        }
    }

    public void Save()
    {
        _context.SaveChanges();
    }
}