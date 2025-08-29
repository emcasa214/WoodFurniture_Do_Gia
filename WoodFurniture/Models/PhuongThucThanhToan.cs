using System;
using System.Collections.Generic;

namespace WoodFurniture.Models;

public partial class PhuongThucThanhToan
{
    public int Id { get; set; }

    public string TenPttt { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<DonHang> DonHangs { get; set; } = new List<DonHang>();
}
