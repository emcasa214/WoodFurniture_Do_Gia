using System;
using System.Collections.Generic;

namespace WoodFurniture.Models;

public partial class KhachHang
{
    public int Id { get; set; }

    public string HoTen { get; set; } = null!;

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<DanhGium> DanhGia { get; set; } = new List<DanhGium>();

    public virtual ICollection<DiaChi> DiaChis { get; set; } = new List<DiaChi>();

    public virtual ICollection<DonHang> DonHangs { get; set; } = new List<DonHang>();

    public virtual ICollection<GioHang> GioHangs { get; set; } = new List<GioHang>();

    public virtual ICollection<KhieuNai> KhieuNais { get; set; } = new List<KhieuNai>();

    public virtual ICollection<LichTuVan> LichTuVans { get; set; } = new List<LichTuVan>();
}
