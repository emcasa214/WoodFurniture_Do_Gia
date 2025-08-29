using System;
using System.Collections.Generic;

namespace WoodFurniture.Models;

public partial class DanhGium
{
    public int Id { get; set; }

    public int SanPhamId { get; set; }

    public int? KhachHangId { get; set; }

    public sbyte Rating { get; set; }

    public string? BinhLuan { get; set; }

    public DateTime? NgayDanhGia { get; set; }

    public string? PhanHoi { get; set; }

    public string? AnhMinhHoa { get; set; }

    public string? Video { get; set; }

    public virtual KhachHang? KhachHang { get; set; }

    public virtual SanPham SanPham { get; set; } = null!;
}
