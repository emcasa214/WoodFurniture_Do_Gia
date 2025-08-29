using WoodFurniture.Models;

public class CustomerRepository
{
    private readonly WoodFurnitureContext _context;

    public CustomerRepository(WoodFurnitureContext context)
    {
        _context = context;
    }

    public IEnumerable<KhachHang> GetAll()
    {
        return _context.KhachHangs.ToList();
    }

    public void Add(KhachHang customer)
    {
        _context.KhachHangs.Add(customer);
    }

    public void Update(KhachHang customer)
    {
        _context.KhachHangs.Update(customer);
    }

    public void Delete(KhachHang customer)
    {
        _context.KhachHangs.Remove(customer);
    }

    public void Save()
    {
        _context.SaveChanges();
    }
}