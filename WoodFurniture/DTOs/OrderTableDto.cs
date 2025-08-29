public class OrderTableDto
{
    public int Id { get; set; }
    public int AddressId { get; set; }
    public int KhachHangId { get; set; }
    public int PtttId { get; set; }
    public string TenKhachHang { get; set; }
    public string DiaChi { get; set; }
    public DateTime? NgayDat { get; set; }
    public TrangThaiDonHang TrangThai { get; set; }
}