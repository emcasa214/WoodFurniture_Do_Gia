using WoodFurniture.Models;
using WoodFurniture.Repositories;
namespace WoodFurniture.Services
{
	public class OrderProductService
	{
		private readonly OrderProductRepository _repo;
		public OrderProductService(OrderProductRepository repo)
		{
			_repo = repo;
		}
		public void Add(SanPhamDonHang entity) => _repo.Add(entity);
		public void Update(SanPhamDonHang entity) => _repo.Update(entity);
		public bool Delete(int id) => _repo.Delete(id);
	}
}
