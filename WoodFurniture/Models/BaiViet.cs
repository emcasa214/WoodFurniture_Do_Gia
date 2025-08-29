using System;
using System.Collections.Generic;

namespace WoodFurniture.Models;

public partial class BaiViet
{
    public int Id { get; set; }

    public string TieuDe { get; set; } = null!;

    public string? NoiDung { get; set; }

    public DateTime? CreatedAt { get; set; }

    public int AdminId { get; set; }

    public string? LoaiBaiViet { get; set; }

    public virtual Admin Admin { get; set; } = null!;

    public virtual ICollection<SanPham> SanPhams { get; set; } = new List<SanPham>();
}
