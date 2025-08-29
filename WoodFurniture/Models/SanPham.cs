using System;
using System.Collections.Generic;

namespace WoodFurniture.Models;

public partial class SanPham
{
    public int Id { get; set; }

    public string TenSp { get; set; } = null!;

    public string? MoTa { get; set; }

    public decimal Gia { get; set; }

    public int? AdminId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public string? ChatLieu { get; set; }

    public string? KichThuoc { get; set; }

    public string? MauSac { get; set; }

    public decimal? TrongLuong { get; set; }

    public string? PhongCach { get; set; }

    public string? XuatXu { get; set; }

    public string? BaoHanh { get; set; }

    public string? TinhTrang { get; set; }

    public string? HinhAnhDaiDien { get; set; }

    public int? DaBan { get; set; }

    public bool? IsNoiBat { get; set; }

    public virtual Admin? Admin { get; set; }

    public virtual ICollection<ChiTietGioHang> ChiTietGioHangs { get; set; } = new List<ChiTietGioHang>();

    public virtual ICollection<DanhGium> DanhGia { get; set; } = new List<DanhGium>();

    public virtual ICollection<SanPhamDonHang> SanPhamDonHangs { get; set; } = new List<SanPhamDonHang>();

    public virtual ICollection<BaiViet> BaiViets { get; set; } = new List<BaiViet>();
}
