// Bước 1: Import các thư viện và component cần thiết
import React, { useEffect, useState } from "react";
import { fetchCustomer} from "@/services/customerApi";
import { addCustomer } from "@/services/customerApi";
import { ModalBeforeOrder2 }  from "@/widgets/layout/modalBeforeOrder2";
import { ModalAddCustomer } from "@/widgets/layout/ModalAddCustomer";

// Bước 2: Khai báo component ModalBeforeOrder, nhận các props từ cha
export function ModalBeforeOrder({ open, onClose , onOrderCreated, editOrder }) {
    // Bước 3: Hàm xử lý thêm khách hàng mới qua API
    const handleAddCustomer = async () => {
        try {
            const res = await addCustomer({
                hoTen: form.hoTen,
                email: form.email,
                phone: form.phone
            });
            console.log("Response từ BE khi thêm khách hàng:", res);
            // Nếu API trả về object có id, cập nhật lại danh sách và chọn khách mới
            if (res && res.customer && res.customer.id) {
                setCustomers(prev => [res.customer, ...prev]);
                setSelectedCustomer(String(res.customer.id)); // Cập nhật selectedCustomer với ID khách hàng vừa thêm
                setSelectedCustomerObj(res.customer); // Đưa luôn object khách hàng
                console.log("[ModalBeforeOrder] Set selectedCustomerObj after add:", res.customer);
                console.log("Thêm khách hàng thành công:", res.customer.id);
                setShowAddCustomer(false);
                setOpenModalAddress(true); // Mở modal địa chỉ và truyền customer vừa thêm
            }
        } catch (err) {
            alert("Không thêm được khách hàng!");
        }
    };
    // Bước 4: Khai báo các state quản lý dữ liệu và trạng thái giao diện
    const [search, setSearch] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [selectedCustomerObj, setSelectedCustomerObj] = useState(null);
    const [showAddCustomer, setShowAddCustomer] = useState(false);
    const [form, setForm] = useState({ hoTen: "", email: "", phone: "" });
    const [customers, setCustomers] = useState([]);
    const [openModalAddress, setOpenModalAddress] = useState(false);
    const [openAddCustomer, setOpenAddCustomer] = useState(false);

    // Bước 5: Khi mở modal sửa, đồng bộ lại khách đã chọn từ editOrder (theo id)
    useEffect(() => {
        console.log("[ModalBeforeOrder] useEffect editOrder:", editOrder, "customers.length:", customers.length);
        if (editOrder) {
            // Nếu có id khách hàng trong đơn, chọn đúng khách đó
            if (editOrder.khachHangId) {
                const customer = customers.find(c => Number(c.id) === Number(editOrder.khachHangId));
                console.log("[ModalBeforeOrder] Found customer for edit:", customer);
                if (customer) {
                    setSelectedCustomer(String(editOrder.khachHangId));
                    setSelectedCustomerObj(customer);
                } else {
                    // Nếu chưa có trong danh sách, tạo object tạm thời với id
                    console.log("[ModalBeforeOrder] Customer not in list, creating temp object");
                    setSelectedCustomer(String(editOrder.khachHangId));
                    setSelectedCustomerObj({ id: Number(editOrder.khachHangId) });
                }
            } else {
                setSelectedCustomer("");
                setSelectedCustomerObj(null);
            }
        } else {
            setSelectedCustomer("");
            setSelectedCustomerObj(null);
        }
    }, [editOrder, customers]);

    // Bước 6: Debug - Log khi selectedCustomerObj thay đổi
    useEffect(() => {
        console.log("[ModalBeforeOrder] selectedCustomerObj changed:", selectedCustomerObj);
    }, [selectedCustomerObj]);

    // Bước 7: Lấy danh sách khách hàng khi mở modal
    useEffect(() => {
        fetchCustomer()
            .then(data => {
                console.log("[ModalBeforeOrder] Fetched customers:", data);
                setCustomers(Array.isArray(data) ? data : []);
            })
            .catch(err => {
                setCustomers([]);
                console.error("Lỗi khi lấy danh sách khách hàng:", err);
            });
    }, []);

    // Bước 8: Theo dõi selectedCustomerObj và mở modal địa chỉ khi giá trị được cập nhật
    useEffect(() => {
        if (selectedCustomerObj) {
            console.log("[ModalBeforeOrder] selectedCustomerObj updated, opening address modal:", selectedCustomerObj);
            // setOpenModalAddress(true);
        }
    }, [selectedCustomerObj]);

    // Bước 9: Xử lý khi tạo/sửa đơn xong, đóng modal và báo lên cha
    const handleOrderCreated = (created) => {
        setOpenModalAddress(false); // chắc chắn đóng modal địa chỉ
        onClose();                  // đóng modal chọn khách
        onOrderCreated?.(created);  // báo lên Profile để cập nhật danh sách
    };
    // Bước 10: Lọc danh sách khách theo số điện thoại khi tìm kiếm
    const filteredCustomers = customers.filter(
        (c) => c.phone && c.phone.includes(search)
    );

    // Bước 11: Nếu modal chưa mở thì không render gì
    if (!open) return null;
    // Bước 12: Render giao diện modal chọn khách hàng
    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
        }}>
            {/* Bước 13: Render modal chọn địa chỉ */}
            <ModalBeforeOrder2
                open={openModalAddress}
                onClose={() => setOpenModalAddress(false)}
                customer={selectedCustomerObj}
                onOrderCreated={handleOrderCreated}
                editOrder={editOrder}
            />
            {/* Modal thêm khách hàng riêng */}
            <ModalAddCustomer
                open={openAddCustomer}
                onClose={() => setOpenAddCustomer(false)}
                onCustomerAdded={customer => {
                    setCustomers(prev => [customer, ...prev]);
                    setSelectedCustomer(String(customer.id));
                    setSelectedCustomerObj(customer);
                    setOpenAddCustomer(false);
                    // Không mở modal địa chỉ tự động ở đây nữa
                }}
            />
            <div style={{
                background: "#fff",
                padding: 32,
                borderRadius: 8,
                minWidth: 400,
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
            }}>
                <h3 style={{ marginBottom: 16 }}>chọn khách cho đơn hàng</h3>
                <div style={{ marginBottom: 16 }}>
                    {/* Bước 14: Select box khách hàng, luôn chọn đúng khách đã chọn khi sửa đơn */}
                    <select
                        style={{ width: "100%", marginBottom: 8, padding: 4 }}
                        value={selectedCustomer}
                        onChange={e => {
                            const value = e.target.value;
                            setSelectedCustomer(value);
                            if (value === "add") {
                                setOpenAddCustomer(true);
                                setShowAddCustomer(false);
                                setSelectedCustomerObj(null);
                            } else {
                                setShowAddCustomer(false);
                                const customer = customers.find(c => String(c.id) === value);
                                setSelectedCustomerObj(customer || null);
                            }
                        }}
                    >
                        <option value="">chọn khách</option>
                        {filteredCustomers.map((c, idx) => (
                            <option key={idx} value={c.id}>
                                {c.hoTen} - {c.phone}
                            </option>
                        ))}
                        <option value="add">Thêm khách hàng</option>
                    </select>
                    {/* Bước 15: Input tìm kiếm khách hàng theo số điện thoại */}
                    <input
                        type="text"
                        placeholder="tìm theo số điện thoại"
                        style={{ width: "100%", marginBottom: 8, padding: 4 }}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                {/* Bước 16: Hiển thị thông tin khách hàng hoặc form thêm mới */}
                <div style={{ marginBottom: 16 }}>
                    {/* Xóa phần form thêm khách hàng cũ, chỉ giữ hiển thị thông tin khách đã chọn */}
                    {selectedCustomerObj ? (
                        <>
                            {/* Bước 19: Hiển thị thông tin khách hàng đã chọn */}
                            <div style={{ marginBottom: 8 }}>
                                <label>Họ tên:</label>
                                <div style={{ padding: 4, background: '#f5f5f5', borderRadius: 4 }}>{selectedCustomerObj.hoTen || selectedCustomerObj.HoTen}</div>
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <label>Email:</label>
                                <div style={{ padding: 4, background: '#f5f5f5', borderRadius: 4 }}>{selectedCustomerObj.email || selectedCustomerObj.Email}</div>
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <label>SĐT:</label>
                                <div style={{ padding: 4, background: '#f5f5f5', borderRadius: 4 }}>{selectedCustomerObj.phone || selectedCustomerObj.Phone}</div>
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                                {/* Bước 20: Nút tiếp để chuyển sang màn thêm địa chỉ, nút hủy để đóng modal */}
                                <button
                                    style={{ padding: "6px 16px" }}
                                    onClick={() => {
                                        if (selectedCustomerObj && selectedCustomerObj.id) {
                                            setOpenModalAddress(true);
                                        } else {
                                            console.warn("[ModalBeforeOrder] Cannot open address modal: invalid customer", selectedCustomerObj);
                                            alert("Khách hàng không hợp lệ. Vui lòng chọn lại.");
                                        }
                                    }}
                                    disabled={!selectedCustomerObj || !selectedCustomerObj.id}
                                >Tiếp</button>
                                <button
                                    style={{ padding: "6px 16px" }}
                                    onClick={onClose}
                                >Hủy</button>
                            </div>

                        </>
                    ) : null}

                </div>
            </div>
        </div>
    );
}
