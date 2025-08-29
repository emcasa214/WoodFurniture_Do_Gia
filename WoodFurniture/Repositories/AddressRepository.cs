using WoodFurniture.Models;

public class AddressRepository
{
    private readonly WoodFurnitureContext _context;

    public AddressRepository(WoodFurnitureContext context)
    {
        _context = context;
    }

    public IEnumerable<DiaChi> GetAll()
    {
        return _context.DiaChis.ToList();
    }
    public IEnumerable<DiaChi> GetAddressesForCustomerId(int customerId)
    {
        return _context.DiaChis.Where(a => a.KhachHangId == customerId).ToList();
    }

    public void Add(DiaChi address)
    {
        _context.DiaChis.Add(address);
    }

    public void Update(DiaChi address)
    {
        _context.DiaChis.Update(address);
    }

    public void Delete(DiaChi address)
    {
        _context.DiaChis.Remove(address);
    }

    public void Save()
    {
        _context.SaveChanges();
    }
}