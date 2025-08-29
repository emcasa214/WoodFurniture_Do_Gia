using System;
using System.Collections.Generic;

namespace WoodFurniture.Models;

public partial class GioHang
{
    public int Id { get; set; }

    public int KhachHangId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<ChiTietGioHang> ChiTietGioHangs { get; set; } = new List<ChiTietGioHang>();

    public virtual KhachHang KhachHang { get; set; } = null!;
}
