using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace WoodFurniture.Models;

public partial class DonHang
{
    public int Id { get; set; }

    public int KhachHangId { get; set; }

    public int DiaChiId { get; set; }

    public int PtttId { get; set; }

    public DateTime? NgayDat { get; set; }

    public TrangThaiDonHang TrangThai { get; set; }

    public virtual DiaChi? DiaChi { get; set; } = null!;

    public virtual KhachHang? KhachHang { get; set; } = null!;

    public virtual PhuongThucThanhToan? Pttt { get; set; } = null!;

    public virtual ICollection<SanPhamDonHang> SanPhamDonHangs { get; set; } = new List<SanPhamDonHang>();
}
