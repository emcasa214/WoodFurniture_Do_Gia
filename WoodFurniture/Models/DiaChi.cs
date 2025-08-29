using System;
using System.Collections.Generic;

namespace WoodFurniture.Models;

public partial class DiaChi
{
    public int Id { get; set; }

    public int KhachHangId { get; set; }

    public string DiaChiText { get; set; } = null!;

    public bool? IsDefault { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<DonHang> DonHangs { get; set; } = new List<DonHang>();

    public virtual KhachHang? KhachHang { get; set; } = null!;
}
