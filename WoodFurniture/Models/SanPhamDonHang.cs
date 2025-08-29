using System;
using System.Collections.Generic;

namespace WoodFurniture.Models;

public partial class SanPhamDonHang
{
    public int Id { get; set; }

    public int DonHangId { get; set; }

    public int SanPhamId { get; set; }

    public int SoLuong { get; set; }

    public decimal GiaTaiDat { get; set; }

    public virtual DonHang? DonHang { get; set; } = null!;

    public virtual SanPham? SanPham { get; set; } = null!;
}
