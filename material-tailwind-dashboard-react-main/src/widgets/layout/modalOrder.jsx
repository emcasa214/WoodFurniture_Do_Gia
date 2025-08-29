import { ProductSelectQuantity } from "@/components/ProductSelectQuantity";
import React, { useEffect, useState } from "react";
import { fetchPayment } from "@/services/paymentApi";
import { addOrder, editOrderApi, addOrderProductToOrder, deleteOrderProduct } from "@/services/orderApi";

export function ModalOrder({ open, onClose, customerId, addressId, onSuccess, editOrder }) {
    // Nếu editOrder, khởi tạo các trường từ đơn hàng
    const [shippingMethod, setShippingMethod] = useState(editOrder ? String(editOrder.ptttId || "") : "");
    const [orderDate, setOrderDate] = useState(editOrder ? (editOrder.ngayDat || "") : "");
    const [orderStatus, setOrderStatus] = useState(editOrder ? (editOrder.trangThai || "") : "");
    const [payments, setPayments] = useState([]);
    // State cho danh sách sản phẩm đơn hàng
    const [orderProducts, setOrderProducts] = useState([{ productId: "", quantity: 1 }]);

    // Đồng bộ lại các trường khi editOrder thay đổi
    useEffect(() => {
        if (open) {
            if (editOrder) {
                console.log("[ModalOrder] Đang sửa đơn hàng với id:", editOrder.id);
                setShippingMethod(String(editOrder.ptttId || ""));
                setOrderDate(editOrder.ngayDat ? editOrder.ngayDat.slice(0, 10) : "");
                const statusMap = {
                    0: "pending",
                    1: "shipping",
                    2: "completed",
                    3: "canceled"
                };
                setOrderStatus(statusMap[editOrder.trangThai] || "");
                // Nếu editOrder có danh sách sản phẩm, đổ vào state
                if (editOrder.products && Array.isArray(editOrder.products)) {
                    setOrderProducts(editOrder.products.map(p => ({ productId: p.productId || p.sanPhamId || "", quantity: p.quantity || p.soLuong || 1 })));
                }
            } else {
                setShippingMethod("");
                setOrderDate("");
                setOrderStatus("");
                setOrderProducts([{ productId: "", quantity: 1 }]);
            }
        }
    }, [editOrder, open]);

    const orderStatusOptions = [
        { value: "pending", label: "Chờ xác nhận" },
        { value: "shipping", label: "Đang giao" },
        { value: "completed", label: "Hoàn thành" },
        { value: "canceled", label: "Đã hủy" }
    ];

    useEffect(() => {
        fetchPayment()
            .then(data => {
                // Xử lý dữ liệu phương thức thanh toán nếu cần
                setPayments(data);
                console.log("Phương thức thanh toán:", data);
            })
            .catch(err => {
                console.error("Lỗi khi lấy danh sách phương thức thanh toán:", err);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const statusMap = {
        pending: 0,
        shipping: 1,
        completed: 2,
        canceled: 3
        };
        const newOrder = {
            khachHangId: customerId,
            diaChiId: addressId,
            ptttId: Number(shippingMethod),
            ngayDat: orderDate,
            trangThai: statusMap[orderStatus]
        };
        const token = localStorage.getItem("token");
        let res;
        try {
            if (editOrder && editOrder.id) {
                newOrder.id = editOrder.id; 
                // Sửa đơn hàng
                console.log('Gửi lên API sửa:', {id: editOrder.id, body: newOrder});
                res = await editOrderApi(editOrder.id, newOrder, token);
            } else {
                // Tạo đơn hàng mới
                res = await addOrder(newOrder, token);
            }
            console.log("Đơn hàng đã được tạo/sửa:", res);
            onSuccess?.(res);
            // Đảm bảo reload gọi trước khi đóng modal
            setTimeout(() => {
                onClose();
            }, 0);
        } catch (err) {
            console.error("Lỗi khi tạo/sửa đơn hàng:", err);
        }
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
            <div style={{
                background: "#fff",
                padding: 32,
                borderRadius: 8,
                minWidth: 400,
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
            }}>
                <h3 style={{ marginBottom: 16 }}>Tạo đơn hàng</h3>

                <div style={{ marginBottom: 8 }}>
                    <label>id khách:</label>
                    <div style={{ padding: 4, background: '#f5f5f5', borderRadius: 4 }}>{customerId}</div>
                </div>

                <div style={{ marginBottom: 8 }}>
                    <label>id địa chỉ:</label>
                    <div style={{ padding: 4, background: '#f5f5f5', borderRadius: 4 }}>{addressId}</div>
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label>chọn phương thức thanh toán:</label>
                    <select
                        style={{ width: "100%", marginBottom: 8, padding: 4 }}
                        value={shippingMethod}
                        onChange={e => setShippingMethod(e.target.value)}
                    >
                        <option value="">Chọn phương thức thanh toán</option>
                        {payments.map((p, idx) => (
                            <option key = {idx} value={p.id}>
                                {p.tenPttt}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label>Ngày đặt:</label>
                    <input
                        type="date"
                        style={{ width: "100%", marginBottom: 8, padding: 4 }}
                        value={orderDate}
                        onChange={e => setOrderDate(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Trạng thái đơn hàng:</label>
                    <select
                        style={{ width: "100%", marginBottom: 8, padding: 4 }}
                        value={orderStatus}
                        onChange={e => setOrderStatus(e.target.value)}
                    >
                        <option value="">Trạng thái đơn hàng</option>
                          {orderStatusOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>
                            {opt.label}
                            </option>
                           ))}
                        {/* Thêm các trạng thái khác nếu cần */}
                    </select>
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label>Chọn sản phẩm và số lượng:</label>
                    {orderProducts.map((item, idx) => (
                        <div key={idx} style={{ marginBottom: 8 }}>
                                <ProductSelectQuantity
                                    value={item}
                                    onChange={val => {
                                        setOrderProducts(arr => arr.map((it, i) => i === idx ? val : it));
                                    }}
                                    orderId={editOrder?.id}
                                    onCreate={async (data) => {
                                        // Gọi API thêm sản phẩm vào đơn hàng
                                        const token = localStorage.getItem("token");
                                        const body = {
                                            donHangId: data.orderId,
                                            sanPhamId: Number(data.productId),
                                            soLuong: data.quantity,
                                            giaTaiDat: data.price
                                        };
                                        console.log("[Gửi BE] addOrderProductToOrder:", {
                                            url: `http://localhost:5138/orderproduct/add-to-order/${data.orderId}`,
                                            body
                                        });
                                        try {
                                            const res = await addOrderProductToOrder(data.orderId, body, token);
                                            console.log("Thêm sản phẩm vào đơn hàng thành công:", res);
                                            // Có thể reload lại danh sách sản phẩm đơn hàng hoặc cập nhật UI nếu cần
                                        } catch (err) {
                                            console.error("Lỗi khi thêm sản phẩm vào đơn hàng:", err);
                                        }
                                    }}
                                    onDelete={async () => {
                                        // Nếu có editOrder và sản phẩm đã có id trong đơn hàng, gọi API xóa
                                        if (editOrder && editOrder.products && editOrder.products[idx] && editOrder.products[idx].id) {
                                            const token = localStorage.getItem("token");
                                            try {
                                                await deleteOrderProduct(editOrder.products[idx].id, token);
                                                console.log("Đã xóa sản phẩm đơn hàng khỏi backend:", editOrder.products[idx].id);
                                            } catch (err) {
                                                console.error("Lỗi khi xóa sản phẩm đơn hàng:", err);
                                            }
                                        }
                                        // Xóa khỏi UI
                                        setOrderProducts(arr => arr.filter((_, i) => i !== idx));
                                    }}
                                />
                        </div>
                    ))}
                    <button style={{ marginTop: 8 }} onClick={() => setOrderProducts(arr => [...arr, { productId: "", quantity: 1 }])}>+ Thêm sản phẩm</button>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                    <button style={{ padding: "6px 16px" }} onClick={handleSubmit}>Tạo</button>
                    <button style={{ padding: "6px 16px" }} onClick={onClose}>Hủy</button>
                </div>
            </div>
        </div>
    );
}