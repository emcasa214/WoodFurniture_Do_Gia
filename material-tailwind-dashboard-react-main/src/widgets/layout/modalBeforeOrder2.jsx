import React, { useEffect, useState } from "react";
// import fetchAddress từ service tương ứng
import { fetchAddressForId } from "@/services/addressApi";
import { addAddress } from "@/services/addressApi";
import { ModalOrder } from "@/widgets/layout/modalOrder";

export function ModalBeforeOrder2({ open, onClose, customer, onOrderCreated, editOrder }) {
    // Hàm lưu địa chỉ mới qua API
    console.log("customer object truyền sang modal địa chỉ:", customer);
    const handleAddAddress = async () => {
        console.log("[ModalBeforeOrder2] Attempting to add address, customer:", customer);
        if (!customer) {
            console.warn("[ModalBeforeOrder2] Customer is null/undefined");
            alert("Vui lòng chọn khách hàng trước khi thêm địa chỉ.");
            return;
        }
        if (!customer.id) {
            console.warn("[ModalBeforeOrder2] Customer missing id property:", customer);
            alert("Khách hàng không có ID hợp lệ. Vui lòng thử lại.");
            return;
        }
        const dataToSend = {
            diaChiText: form.diaChiText,
            isDefault: !!form.isDefault,
            khachHangId: customer.id
        };
        console.log("Dữ liệu gửi lên BE:", dataToSend);
        try {
            const res = await addAddress(dataToSend);
            console.log("Thêm địa chỉ thành công:", res);
            // Nếu API trả về object có id, cập nhật lại danh sách và chọn địa chỉ mới
            if (res && res.address && res.address.id) {
                setAddresses(prev => [res.address, ...prev]);
                setSelectedAddress(String(res.address.id));
                setShowAddAddress(false);
                // Không gọi onOrderCreated, không mở modalOrder tự động
                // Chỉ ở lại phần select để chọn địa chỉ
            }
        } catch (err) {
            alert("Không thêm được địa chỉ!");
        }
    };
    const [search, setSearch] = useState("");
    const [selectedAddress, setSelectedAddress] = useState(editOrder ? (editOrder.addressId || "") : "");
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [form, setForm] = useState({diaChiText: "", isDefault: false });
    const [addresses, setAddresses] = useState([]);
    const selectedAddressObj = addresses.find(a => a.id === Number(selectedAddress));
    console.log("edit order", editOrder);

    // Đồng bộ lại địa chỉ đã chọn khi nhận editOrder mới hoặc khi danh sách địa chỉ thay đổi
    useEffect(() => {
        if (editOrder && addresses.length > 0) {
            if (editOrder.addressId) {
                setSelectedAddress(String(editOrder.addressId));
            } else {
                setSelectedAddress("");
            }
        } else if (!editOrder) {
            setSelectedAddress("");
        }
    }, [editOrder, addresses]);

    const [openModalOrder, setOpenModalOrder] = useState(false);

    useEffect(() => {
        console.log("[ModalBeforeOrder2] customer useEffect:", customer);
        if (customer && customer.id) {
            fetchAddressForId(customer.id)
                .then(data => {
                    setAddresses(Array.isArray(data) ? data : []);
                    console.log("[ModalBeforeOrder2] Fetched addresses:", data);
                })
                .catch(err => {
                    setAddresses([]);
                    console.error("Lỗi khi lấy danh sách địa chỉ:", err);
                });
        } else {
            setAddresses([]);
        }
    }, [customer]);

    useEffect(() => {
        console.log("[ModalBeforeOrder2] openModalOrder changed:", openModalOrder);
    }, [openModalOrder]);

    const handleOrderCreated = (created) => {
        setOpenModalOrder(false); // đóng modal tạo đơn
        onClose();                // đóng modal chọn địa chỉ
        onOrderCreated?.(created); // báo lên cha (ModalBeforeOrder/Profile)
    };

    if (!open) return null;

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
            <ModalOrder
                open={openModalOrder}
                onClose={() => setOpenModalOrder(false)}
                customerId={customer ? customer.id : null}
                addressId={selectedAddressObj ? selectedAddressObj.id : null}
                onSuccess={handleOrderCreated}
                editOrder={editOrder}
            />
            <div style={{
                background: "#fff",
                padding: 32,
                borderRadius: 8,
                minWidth: 400,
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
            }}>
                <h3 style={{ marginBottom: 16 }}>chọn địa chỉ cho đơn hàng</h3>
                <div style={{ marginBottom: 16 }}>
                    {/* phần select box  */}
                    <select
                        style={{ width: "100%", marginBottom: 8, padding: 4 }}
                        value={selectedAddress}
                        onChange={e => {
                            setSelectedAddress(e.target.value);
                            setShowAddAddress(e.target.value === "add");
                        }}
                    >
                        <option value="">chọn địa chỉ</option>
                        {addresses.map((a, idx) => (
                            <option key={idx} value={a.id}>
                                {a.diaChiText}
                            </option>
                        ))}
                        <option value="add">Thêm địa chỉ</option>
                    </select>
           
                </div>
                {/* phần thông tin địa chỉ  */}
                <div style={{ marginBottom: 16 }}>
                    {showAddAddress ? (
                        <>
                            <div style={{ marginBottom: 8 }}>
                                <label>Địa chỉ chi tiết:</label>
                                <div style={{ padding: 4, background: '#f5f5f5', borderRadius: 4 }}>
                                    <input
                                        type="text"
                                        placeholder="địa chỉ chi tiết"
                                        style={{ width: "100%", marginBottom: 8, padding: 4 }}
                                        value={form.diaChiText}
                                        onChange={e => setForm({ ...form, diaChiText: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={form.isDefault}
                                        onChange={e => setForm({ ...form, isDefault: e.target.checked })}
                                        style={{ marginRight: 8 }}
                                    />
                                    Đặt làm địa chỉ mặc định
                                </label>
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                                <button
                                    style={{ padding: "6px 16px" }}
                                    onClick={handleAddAddress}
                                >Lưu</button>
                                <button
                                    style={{ padding: "6px 16px" }}
                                    onClick={onClose}
                                >Hủy</button>
                            </div>
                        </>
                    ) : selectedAddressObj ? (
                        <>
                            <div style={{ marginBottom: 8 }}>
                                <label>Địa chỉ chi tiết:</label>
                                <div style={{ padding: 4, background: '#f5f5f5', borderRadius: 4 }}>
                                                                    {selectedAddressObj.diaChiText}
                                </div>                            
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={!!selectedAddressObj.isDefault}
                                        disabled
                                        style={{ marginRight: 8 }}
                                    />
                                    Đặt làm địa chỉ mặc định
                                </label>
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                                <button
                                    style={{ padding: "6px 16px" }}
                                    onClick={() => {
                                        setOpenModalOrder(true);
                                    }}
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
