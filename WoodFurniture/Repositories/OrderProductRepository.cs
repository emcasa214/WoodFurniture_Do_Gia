using WoodFurniture.Models;
using System.Linq;
namespace WoodFurniture.Repositories
{
	public class OrderProductRepository
	{
		private readonly WoodFurnitureContext _context;
		public OrderProductRepository(WoodFurnitureContext context)
		{
			_context = context;
		}
		public void Add(SanPhamDonHang entity)
		{
			_context.SanPhamDonHangs.Add(entity);
			_context.SaveChanges();
		}
		public void Update(SanPhamDonHang entity)
		{
			_context.SanPhamDonHangs.Update(entity);
			_context.SaveChanges();
		}
		public bool Delete(int id)
		{
			var item = _context.SanPhamDonHangs.FirstOrDefault(x => x.Id == id);
			if (item == null) return false;
			_context.SanPhamDonHangs.Remove(item);
			_context.SaveChanges();
			return true;
		}
	}
}
