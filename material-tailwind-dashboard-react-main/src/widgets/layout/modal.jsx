import { useEffect, useState, useRef  } from "react";

export function Modal({ open, onClose, initialData = {}, onSubmit, title = "" }) {
  const [show, setShow] = useState(open);
  const [visible, setVisible] = useState(open);

  // State cho các trường sản phẩm
  const [tenSp, setTenSp] = useState("");
  const [gia, setGia] = useState("");  
  const [moTa, setMoTa] = useState("");
  const [chatLieu, setChatLieu] = useState("");
  const [kichThuoc, setKichThuoc] = useState("");
  const [mauSac, setMauSac] = useState("");
  const [trongLuong, setTrongLuong] = useState("");
  const [phongCach, setPhongCach] = useState("");
  const [xuatXu, setXuatXu] = useState("");
  const [baoHanh, setBaoHanh] = useState("");
  const [tinhTrang, setTinhTrang] = useState("new");
  const [hinhAnhDaiDien, setHinhAnhDaiDien] = useState("");
  const [error, setError] = useState("");

  const modalRef = useRef();

  useEffect(() => {
    if (open) {
      setShow(true);
      setTimeout(() => setVisible(true), 10);
      // Reset giá trị khi mở modal (nếu initialData thay đổi)
      setTenSp(initialData.tenSp || "");
      setGia(initialData.gia || "");
      setMoTa(initialData?.moTa || "");
      setChatLieu(initialData?.chatLieu || "");
      setKichThuoc(initialData?.kichThuoc || "");
      setMauSac(initialData?.mauSac || "");
      setTrongLuong(initialData?.trongLuong || "");
      setPhongCach(initialData?.phongCach || "");
      setXuatXu(initialData?.xuatXu || "");
      setBaoHanh(initialData?.baoHanh || "");
      setTinhTrang(initialData?.tinhTrang || "new");
      setHinhAnhDaiDien(initialData?.hinhAnhDaiDien || "");
      setError("");
    } else {
      setVisible(false);
      const timer = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open, initialData]);

  console.log("token", localStorage.getItem("token"));

  if (!show) return null;

    // Đóng modal khi click ra ngoài
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose && onClose();
    }
  };

  const handleSubmit = () => {
    if (!tenSp.trim() || gia === "" || gia === null || isNaN(gia)) {
      setError("Tên sản phẩm và giá là bắt buộc.");
      return;
    }
    // Gửi dữ liệu lên component cha
    onSubmit && onSubmit({
      TenSp: tenSp,
      Gia: parseFloat(gia) || 0,
      MoTa: moTa,
      ChatLieu: chatLieu,
      KichThuoc: kichThuoc,
      MauSac: mauSac,
      TrongLuong: parseFloat(trongLuong) || null,
      PhongCach: phongCach,
      XuatXu: xuatXu,
      BaoHanh: baoHanh,
      TinhTrang: tinhTrang,
      HinhAnhDaiDien: hinhAnhDaiDien,
    });
  };

  return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleOverlayClick}>
    <div ref={modalRef} className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{title}</h2>
      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Tên sản phẩm */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên sản phẩm *
          </label>
          <input
            type="text"
            value={tenSp}
            onChange={e => setTenSp(e.target.value)}
            placeholder="Nhập tên sản phẩm..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        {/* Giá */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Giá *
          </label>
          <input
            type="number"
            value={gia}
            onChange={e => setGia(e.target.value)}
            placeholder="Nhập giá sản phẩm..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        {/* Chất liệu */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chất liệu
          </label>
          <input
            type="text"
            value={chatLieu}
            onChange={e => setChatLieu(e.target.value)}
            placeholder="Nhập chất liệu..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Kích thước */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kích thước
          </label>
          <input
            type="text"
            value={kichThuoc}
            onChange={e => setKichThuoc(e.target.value)}
            placeholder="Nhập kích thước..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Màu sắc */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Màu sắc
          </label>
          <input
            type="text"
            value={mauSac}
            onChange={e => setMauSac(e.target.value)}
            placeholder="Nhập màu sắc..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Trọng lượng */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trọng lượng (kg)
          </label>
          <input
            type="number"
            step="0.1"
            value={trongLuong}
            onChange={e => setTrongLuong(e.target.value)}
            placeholder="Nhập trọng lượng..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Phong cách */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phong cách
          </label>
          <input
            type="text"
            value={phongCach}
            onChange={e => setPhongCach(e.target.value)}
            placeholder="Nhập phong cách..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Xuất xứ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Xuất xứ
          </label>
          <input
            type="text"
            value={xuatXu}
            onChange={e => setXuatXu(e.target.value)}
            placeholder="Nhập xuất xứ..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Bảo hành */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bảo hành
          </label>
          <input
            type="text"
            value={baoHanh}
            onChange={e => setBaoHanh(e.target.value)}
            placeholder="Nhập thông tin bảo hành..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Tình trạng */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tình trạng
          </label>
          <select
            value={tinhTrang}
            onChange={e => setTinhTrang(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="new">new</option>
            <option value="sold out">sold out</option>
            <option value="sale">sale</option>
          </select>
        </div>
        {/* Hình ảnh đại diện */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL Hình ảnh đại diện
          </label>
          <input
            type="url"
            value={hinhAnhDaiDien}
            onChange={e => setHinhAnhDaiDien(e.target.value)}
            placeholder="Nhập URL hình ảnh..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Mô tả */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mô tả
          </label>
          <textarea
            value={moTa}
            onChange={e => setMoTa(e.target.value)}
            placeholder="Nhập mô tả sản phẩm..."
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Nút lưu/hủy */}
        <div className="col-span-2 flex gap-4 justify-center mt-6">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Lưu
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Đóng
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}
