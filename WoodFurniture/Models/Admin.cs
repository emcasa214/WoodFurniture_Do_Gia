using System;
using System.Collections.Generic;

namespace WoodFurniture.Models;

public partial class Admin
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string? Email { get; set; }

    public string? Role { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<BaiViet> BaiViets { get; set; } = new List<BaiViet>();

    public virtual ICollection<KhieuNai> KhieuNais { get; set; } = new List<KhieuNai>();

    public virtual ICollection<LichTuVan> LichTuVans { get; set; } = new List<LichTuVan>();

    public virtual ICollection<SanPham> SanPhams { get; set; } = new List<SanPham>();
}
