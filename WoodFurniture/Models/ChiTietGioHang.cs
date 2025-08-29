using System;
using System.Collections.Generic;

namespace WoodFurniture.Models;

public partial class ChiTietGioHang
{
    public int Id { get; set; }

    public int GioHangId { get; set; }

    public int SanPhamId { get; set; }

    public int SoLuong { get; set; }

    public DateTime? AddedAt { get; set; }

    public virtual GioHang GioHang { get; set; } = null!;

    public virtual SanPham SanPham { get; set; } = null!;
}
