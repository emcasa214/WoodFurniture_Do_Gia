using WoodFurniture.Models;

public static class ProductTableAdminMapper
{
    public static ProductTableAdminDto ToDto(SanPham sp)
    {
        return new ProductTableAdminDto
        {
            Id = sp.Id,
            Name = sp.TenSp,
            Price = sp.Gia,
            Material = sp.ChatLieu,
            Size = sp.KichThuoc,
            Status = sp.TinhTrang
        };
    }

    public static List<ProductTableAdminDto> ToDtoList(IEnumerable<SanPham> sanPhams)
    {
        return sanPhams.Select(sp => ToDto(sp)).ToList();
    }
}