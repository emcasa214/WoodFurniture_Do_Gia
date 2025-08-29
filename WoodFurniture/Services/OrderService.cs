using System.Collections.Generic;
using WoodFurniture.Models;


public class OrderService
{
    private readonly OrderRepository _orderRepository;
    private readonly WoodFurnitureContext _context;
    public OrderService(OrderRepository orderRepository, WoodFurnitureContext context)
    {
        _orderRepository = orderRepository;
        _context = context;
    }

    public List<OrderTableDto> GetAllOrderForTable()
    {
#pragma warning disable CS8601 // Possible null reference assignment.
        return _context.DonHangs
            .Select(o => new OrderTableDto
            {
                Id = o.Id,
                AddressId = o.DiaChiId, // lấy id địa chỉ
                    KhachHangId = o.KhachHangId, // lấy id khách hàng
                    PtttId = o.PtttId, // lấy id phương thức thanh toán
                TenKhachHang = _context.KhachHangs
                    .Where(kh => kh.Id == o.KhachHangId)
                    .Select(kh => kh.HoTen)
                    .FirstOrDefault(),
                DiaChi = _context.DiaChis
                    .Where(dc => dc.Id == o.DiaChiId)
                    .Select(dc => dc.DiaChiText)
                    .FirstOrDefault(),
                NgayDat = o.NgayDat,
                TrangThai = o.TrangThai
            })
            .ToList();
#pragma warning restore CS8601 // Possible null reference assignment.
    }
    public void Add(DonHang order)
    {
        if (order == null)
            throw new ArgumentNullException(nameof(order), "Order cannot be null.");

        _orderRepository.Add(order);
        _orderRepository.Save();
    }
    public void Update(DonHang order)
    {
        if (order == null)
            throw new ArgumentNullException(nameof(order), "Order cannot be null.");

        _orderRepository.Update(order);
        _orderRepository.Save();
    }
    public bool Delete(int id)
    {
        if (id <= 0)
            throw new ArgumentException("Invalid order ID.", nameof(id));

        _orderRepository.Delete(id);
        _orderRepository.Save();
        return true;
    }

}