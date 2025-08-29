using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace WoodFurniture.Models;

public partial class WoodFurnitureContext : DbContext
{
    public WoodFurnitureContext()
    {
    }

    public WoodFurnitureContext(DbContextOptions<WoodFurnitureContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<BaiViet> BaiViets { get; set; }

    public virtual DbSet<ChiTietGioHang> ChiTietGioHangs { get; set; }

    public virtual DbSet<DanhGium> DanhGia { get; set; }

    public virtual DbSet<DiaChi> DiaChis { get; set; }

    public virtual DbSet<DonHang> DonHangs { get; set; }

    public virtual DbSet<GioHang> GioHangs { get; set; }

    public virtual DbSet<KhachHang> KhachHangs { get; set; }

    public virtual DbSet<KhieuNai> KhieuNais { get; set; }

    public virtual DbSet<LichTuVan> LichTuVans { get; set; }

    public virtual DbSet<PhuongThucThanhToan> PhuongThucThanhToans { get; set; }

    public virtual DbSet<SanPham> SanPhams { get; set; }

    public virtual DbSet<SanPhamDonHang> SanPhamDonHangs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;database=WoodFurniture;user=root;password=root", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.41-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_unicode_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("admin");

            entity.HasIndex(e => e.Username, "username").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(255)
                .HasColumnName("password_hash");
            entity.Property(e => e.Role)
                .HasMaxLength(30)
                .HasDefaultValueSql("'admin'")
                .HasColumnName("role");
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("updated_at");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");
        });

        modelBuilder.Entity<BaiViet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("bai_viet");

            entity.HasIndex(e => e.AdminId, "fk_bai_viet_admin1_idx");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AdminId).HasColumnName("admin_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.LoaiBaiViet)
                .HasMaxLength(45)
                .HasColumnName("loai_bai_viet");
            entity.Property(e => e.NoiDung)
                .HasColumnType("text")
                .HasColumnName("noi_dung");
            entity.Property(e => e.TieuDe)
                .HasMaxLength(200)
                .HasColumnName("tieu_de");

            entity.HasOne(d => d.Admin).WithMany(p => p.BaiViets)
                .HasForeignKey(d => d.AdminId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_bai_viet_admin1");

            entity.HasMany(d => d.SanPhams).WithMany(p => p.BaiViets)
                .UsingEntity<Dictionary<string, object>>(
                    "SanPhamBaiViet",
                    r => r.HasOne<SanPham>().WithMany()
                        .HasForeignKey("SanPhamId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("san_pham_bai_viet_ibfk_2"),
                    l => l.HasOne<BaiViet>().WithMany()
                        .HasForeignKey("BaiVietId")
                        .HasConstraintName("san_pham_bai_viet_ibfk_1"),
                    j =>
                    {
                        j.HasKey("BaiVietId", "SanPhamId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("san_pham_bai_viet");
                        j.HasIndex(new[] { "SanPhamId" }, "san_pham_id");
                        j.IndexerProperty<int>("BaiVietId").HasColumnName("bai_viet_id");
                        j.IndexerProperty<int>("SanPhamId").HasColumnName("san_pham_id");
                    });
        });

        modelBuilder.Entity<ChiTietGioHang>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("chi_tiet_gio_hang");

            entity.HasIndex(e => e.GioHangId, "gio_hang_id");

            entity.HasIndex(e => e.SanPhamId, "san_pham_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AddedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime")
                .HasColumnName("added_at");
            entity.Property(e => e.GioHangId).HasColumnName("gio_hang_id");
            entity.Property(e => e.SanPhamId).HasColumnName("san_pham_id");
            entity.Property(e => e.SoLuong)
                .HasDefaultValueSql("'1'")
                .HasColumnName("so_luong");

            entity.HasOne(d => d.GioHang).WithMany(p => p.ChiTietGioHangs)
                .HasForeignKey(d => d.GioHangId)
                .HasConstraintName("chi_tiet_gio_hang_ibfk_1");

            entity.HasOne(d => d.SanPham).WithMany(p => p.ChiTietGioHangs)
                .HasForeignKey(d => d.SanPhamId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("chi_tiet_gio_hang_ibfk_2");
        });

        modelBuilder.Entity<DanhGium>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("danh_gia");

            entity.HasIndex(e => e.KhachHangId, "khach_hang_id");

            entity.HasIndex(e => e.SanPhamId, "san_pham_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AnhMinhHoa)
                .HasMaxLength(255)
                .HasColumnName("anh_minh_hoa");
            entity.Property(e => e.BinhLuan)
                .HasColumnType("text")
                .HasColumnName("binh_luan");
            entity.Property(e => e.KhachHangId).HasColumnName("khach_hang_id");
            entity.Property(e => e.NgayDanhGia)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime")
                .HasColumnName("ngay_danh_gia");
            entity.Property(e => e.PhanHoi).HasColumnName("phan_hoi");
            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.SanPhamId).HasColumnName("san_pham_id");
            entity.Property(e => e.Video)
                .HasMaxLength(255)
                .HasColumnName("video");

            entity.HasOne(d => d.KhachHang).WithMany(p => p.DanhGia)
                .HasForeignKey(d => d.KhachHangId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("danh_gia_ibfk_2");

            entity.HasOne(d => d.SanPham).WithMany(p => p.DanhGia)
                .HasForeignKey(d => d.SanPhamId)
                .HasConstraintName("danh_gia_ibfk_1");
        });

        modelBuilder.Entity<DiaChi>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("dia_chi");

            entity.HasIndex(e => e.KhachHangId, "khach_hang_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.DiaChiText)
                .HasMaxLength(255)
                .HasColumnName("dia_chi_text");
            entity.Property(e => e.IsDefault)
                .HasDefaultValueSql("'0'")
                .HasColumnName("is_default");
            entity.Property(e => e.KhachHangId).HasColumnName("khach_hang_id");

            entity.HasOne(d => d.KhachHang).WithMany(p => p.DiaChis)
                .HasForeignKey(d => d.KhachHangId)
                .HasConstraintName("dia_chi_ibfk_1");
        });

        modelBuilder.Entity<DonHang>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("don_hang");

            entity.HasIndex(e => e.DiaChiId, "dia_chi_id");

            entity.HasIndex(e => e.KhachHangId, "khach_hang_id");

            entity.HasIndex(e => e.PtttId, "pttt_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DiaChiId).HasColumnName("dia_chi_id");
            entity.Property(e => e.KhachHangId).HasColumnName("khach_hang_id");
            entity.Property(e => e.NgayDat)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime")
                .HasColumnName("ngay_dat");
            entity.Property(e => e.PtttId).HasColumnName("pttt_id");
            entity.Property(e => e.TrangThai)
                .HasMaxLength(30)
                .HasDefaultValueSql("'moi'")
                .HasColumnName("trang_thai");

            entity.HasOne(d => d.DiaChi).WithMany(p => p.DonHangs)
                .HasForeignKey(d => d.DiaChiId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("don_hang_ibfk_2");

            entity.HasOne(d => d.KhachHang).WithMany(p => p.DonHangs)
                .HasForeignKey(d => d.KhachHangId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("don_hang_ibfk_1");

            entity.HasOne(d => d.Pttt).WithMany(p => p.DonHangs)
                .HasForeignKey(d => d.PtttId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("don_hang_ibfk_3");
        });

        modelBuilder.Entity<GioHang>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("gio_hang");

            entity.HasIndex(e => e.KhachHangId, "khach_hang_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.KhachHangId).HasColumnName("khach_hang_id");

            entity.HasOne(d => d.KhachHang).WithMany(p => p.GioHangs)
                .HasForeignKey(d => d.KhachHangId)
                .HasConstraintName("gio_hang_ibfk_1");
        });

        modelBuilder.Entity<KhachHang>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("khach_hang");

            entity.HasIndex(e => e.Email, "email").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.HoTen)
                .HasMaxLength(100)
                .HasColumnName("ho_ten");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .HasColumnName("phone");
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<KhieuNai>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("khieu_nai");

            entity.HasIndex(e => e.AdminId, "fk_khieu_nai_admin1_idx");

            entity.HasIndex(e => e.KhachHangId, "khach_hang_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AdminId).HasColumnName("admin_id");
            entity.Property(e => e.KhachHangId).HasColumnName("khach_hang_id");
            entity.Property(e => e.NgayKhieuNai)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime")
                .HasColumnName("ngay_khieu_nai");
            entity.Property(e => e.NoiDung)
                .HasColumnType("text")
                .HasColumnName("noi_dung");
            entity.Property(e => e.Status)
                .HasMaxLength(30)
                .HasDefaultValueSql("'moi'")
                .HasColumnName("status");

            entity.HasOne(d => d.Admin).WithMany(p => p.KhieuNais)
                .HasForeignKey(d => d.AdminId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_khieu_nai_admin1");

            entity.HasOne(d => d.KhachHang).WithMany(p => p.KhieuNais)
                .HasForeignKey(d => d.KhachHangId)
                .HasConstraintName("khieu_nai_ibfk_1");
        });

        modelBuilder.Entity<LichTuVan>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("lich_tu_van");

            entity.HasIndex(e => e.AdminId, "fk_lich_tu_van_admin1_idx");

            entity.HasIndex(e => e.KhachHangId, "khach_hang_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AdminId).HasColumnName("admin_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.GhiChu)
                .HasColumnType("text")
                .HasColumnName("ghi_chu");
            entity.Property(e => e.KhachHangId).HasColumnName("khach_hang_id");
            entity.Property(e => e.NgayTuVan)
                .HasColumnType("datetime")
                .HasColumnName("ngay_tu_van");

            entity.HasOne(d => d.Admin).WithMany(p => p.LichTuVans)
                .HasForeignKey(d => d.AdminId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_lich_tu_van_admin1");

            entity.HasOne(d => d.KhachHang).WithMany(p => p.LichTuVans)
                .HasForeignKey(d => d.KhachHangId)
                .HasConstraintName("lich_tu_van_ibfk_1");
        });

        modelBuilder.Entity<PhuongThucThanhToan>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("phuong_thuc_thanh_toan");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.TenPttt)
                .HasMaxLength(50)
                .HasColumnName("ten_pttt");
        });

        modelBuilder.Entity<SanPham>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("san_pham");

            entity.HasIndex(e => e.AdminId, "admin_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AdminId).HasColumnName("admin_id");
            entity.Property(e => e.BaoHanh)
                .HasMaxLength(45)
                .HasColumnName("bao_hanh");
            entity.Property(e => e.ChatLieu)
                .HasMaxLength(45)
                .HasColumnName("chat_lieu");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.DaBan)
                .HasDefaultValueSql("'0'")
                .HasColumnName("da_ban");
            entity.Property(e => e.Gia)
                .HasPrecision(15, 2)
                .HasColumnName("gia");
            entity.Property(e => e.HinhAnhDaiDien)
                .HasMaxLength(255)
                .HasColumnName("hinh_anh_dai_dien");
            entity.Property(e => e.IsNoiBat)
                .HasDefaultValueSql("'0'")
                .HasColumnName("is_noi_bat");
            entity.Property(e => e.KichThuoc)
                .HasMaxLength(45)
                .HasColumnName("kich_thuoc");
            entity.Property(e => e.MauSac)
                .HasMaxLength(45)
                .HasColumnName("mau_sac");
            entity.Property(e => e.MoTa)
                .HasColumnType("text")
                .HasColumnName("mo_ta");
            entity.Property(e => e.PhongCach)
                .HasMaxLength(100)
                .HasColumnName("phong_cach");
            entity.Property(e => e.TenSp)
                .HasMaxLength(150)
                .HasColumnName("ten_sp");
            entity.Property(e => e.TinhTrang)
                .HasColumnType("enum('new','sale','sold out')")
                .HasColumnName("tinh_trang");
            entity.Property(e => e.TrongLuong)
                .HasPrecision(10, 2)
                .HasColumnName("trong_luong");
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("updated_at");
            entity.Property(e => e.XuatXu)
                .HasMaxLength(100)
                .HasColumnName("xuat_xu");

            entity.HasOne(d => d.Admin).WithMany(p => p.SanPhams)
                .HasForeignKey(d => d.AdminId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("san_pham_ibfk_1");
        });

        modelBuilder.Entity<SanPhamDonHang>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("san_pham_don_hang");

            entity.HasIndex(e => e.DonHangId, "don_hang_id");

            entity.HasIndex(e => e.SanPhamId, "san_pham_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DonHangId).HasColumnName("don_hang_id");
            entity.Property(e => e.GiaTaiDat)
                .HasPrecision(15, 2)
                .HasColumnName("gia_tai_dat");
            entity.Property(e => e.SanPhamId).HasColumnName("san_pham_id");
            entity.Property(e => e.SoLuong)
                .HasDefaultValueSql("'1'")
                .HasColumnName("so_luong");

            entity.HasOne(d => d.DonHang).WithMany(p => p.SanPhamDonHangs)
                .HasForeignKey(d => d.DonHangId)
                .HasConstraintName("san_pham_don_hang_ibfk_1");

            entity.HasOne(d => d.SanPham).WithMany(p => p.SanPhamDonHangs)
                .HasForeignKey(d => d.SanPhamId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("san_pham_don_hang_ibfk_2");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
