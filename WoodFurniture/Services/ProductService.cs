using WoodFurniture.Models;

public class ProductService
{
    private readonly ProductRepository _productRepository;

    public ProductService(ProductRepository productRepository)
    {
        _productRepository = productRepository;
    }
    //lấy tất cả sản phẩm
    public IEnumerable<SanPham> GetAllProductsForTableAdmin()
    {
        var p = _productRepository.GetAll();
        if (p == null) return Enumerable.Empty<SanPham>();
        return p;
    }
    public SanPham AddProduct(SanPham sp)
    {
        if (sp == null)
            throw new ArgumentNullException(nameof(sp), "Sản phẩm không được để trống.");
        if (string.IsNullOrWhiteSpace(sp.TenSp))
            throw new ArgumentException("Tên sản phẩm và giá không được để trống.");
        if (sp.Gia <= 0)
            throw new ArgumentException("Giá sản phẩm phải lớn hơn 0.");

        _productRepository.Add(sp);
        _productRepository.Save();

        return sp;
    }
    public SanPham UpdateProduct(SanPham sp)
    {
        _productRepository.Update(sp);
        _productRepository.Save();
        return sp;

    }
    public bool DeleteProduct(int id)
    {
        _productRepository.RemoveOrderProductsByProductId(id);

        var product = _productRepository.GetAll().FirstOrDefault(p => p.Id == id);
        if (product == null) return false;
        _productRepository.Delete(product);
        _productRepository.Save();
        return true;
    }
    
}