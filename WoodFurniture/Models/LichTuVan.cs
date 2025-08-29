using System;
using System.Collections.Generic;

namespace WoodFurniture.Models;

public partial class LichTuVan
{
    public int Id { get; set; }

    public int KhachHangId { get; set; }

    public DateTime NgayTuVan { get; set; }

    public string? GhiChu { get; set; }

    public DateTime? CreatedAt { get; set; }

    public int AdminId { get; set; }

    public virtual Admin Admin { get; set; } = null!;

    public virtual KhachHang KhachHang { get; set; } = null!;
}
