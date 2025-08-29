import React, { useState } from "react";
import { addCustomer } from "@/services/customerApi";

export function ModalAddCustomer({ open, onClose, onCustomerAdded }) {
    const [form, setForm] = useState({ hoTen: "", email: "", phone: "" });
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleAdd = async () => {
        setLoading(true);
        try {
            const res = await addCustomer(form);
            if (res && res.customer && res.customer.id) {
                onCustomerAdded(res.customer);
                onClose();
            } else {
                alert("Không thêm được khách hàng!");
            }
        } catch (err) {
            alert("Không thêm được khách hàng!");
        } finally {
            setLoading(false);
        }
    };

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
            zIndex: 1100
        }}>
            <div style={{ background: "#fff", padding: 32, borderRadius: 8, minWidth: 400 }}>
                <h3 style={{ marginBottom: 16 }}>Thêm khách hàng mới</h3>
                <div style={{ marginBottom: 8 }}>
                    <label>Họ tên:</label>
                    <input
                        type="text"
                        style={{ width: "100%", marginBottom: 8, padding: 4 }}
                        value={form.hoTen}
                        onChange={e => setForm({ ...form, hoTen: e.target.value })}
                    />
                </div>
                <div style={{ marginBottom: 8 }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        style={{ width: "100%", marginBottom: 8, padding: 4 }}
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                </div>
                <div style={{ marginBottom: 8 }}>
                    <label>SĐT:</label>
                    <input
                        type="text"
                        style={{ width: "100%", marginBottom: 8, padding: 4 }}
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                    <button style={{ padding: "6px 16px" }} onClick={handleAdd} disabled={loading}>Lưu</button>
                    <button style={{ padding: "6px 16px" }} onClick={onClose} disabled={loading}>Hủy</button>
                </div>
            </div>
        </div>
    );
}
