using System.Collections.Generic;
using WoodFurniture.Models;

public class ProductRepository
{
    private readonly WoodFurnitureContext _context;
    public ProductRepository(WoodFurnitureContext context)
    {
        _context = context;
    }

    public IEnumerable<SanPham> GetAll()
    {
        return _context.SanPhams.ToList();
    }

    public void RemoveOrderProductsByProductId(int productId)
    {
        var orderProducts = _context.SanPhamDonHangs.Where(x => x.SanPhamId == productId);
        _context.SanPhamDonHangs.RemoveRange(orderProducts);
    }
    public void Add(SanPham sp)
    {
        _context.SanPhams.Add(sp);
    }
    public void Update(SanPham sp)
    {

        _context.SanPhams.Update(sp);
    }
    public void Delete(SanPham sp)
    {
        _context.SanPhams.Remove(sp);
    }
    public void Save()
    {
        _context.SaveChanges();
    }
}