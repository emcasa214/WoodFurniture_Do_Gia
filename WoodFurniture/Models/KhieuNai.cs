using System;
using System.Collections.Generic;

namespace WoodFurniture.Models;

public partial class KhieuNai
{
    public int Id { get; set; }

    public int KhachHangId { get; set; }

    public string NoiDung { get; set; } = null!;

    public DateTime? NgayKhieuNai { get; set; }

    public string? Status { get; set; }

    public int AdminId { get; set; }

    public virtual Admin Admin { get; set; } = null!;

    public virtual KhachHang KhachHang { get; set; } = null!;
}
