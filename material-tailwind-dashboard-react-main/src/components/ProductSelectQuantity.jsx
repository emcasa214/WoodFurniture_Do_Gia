import React, { useEffect, useState } from "react";
import { fetchProducts } from "@/services/productApi";

export function ProductSelectQuantity({ value, onChange, onCreate, onDelete, orderId }) {
  const [created, setCreated] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(value?.productId || "");
  const [quantity, setQuantity] = useState(value?.quantity || 1);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchProducts(token)
      .then(data => {
        console.log("[ProductSelectQuantity] Danh sách sản phẩm:", data);
        setProducts(data);
      })
      .catch(() => setProducts([]));
  }, []);

  // Cập nhật giá khi chọn sản phẩm
useEffect(() => {
const prod = products.find(p => String(p.id) === String(selectedId));
setPrice(prod ? prod.gia : 0);
}, [selectedId, products]);

  useEffect(() => {
    onChange && onChange({ productId: selectedId, quantity, price, total: price * quantity });
  }, [selectedId, quantity, price]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <select
        value={selectedId}
        onChange={e => setSelectedId(e.target.value)}
        style={{ minWidth: 200, padding: 4 }}
      >
        <option value="">Chọn sản phẩm</option>
        {products.map(p => (
          <option key={p.id} value={p.id}>{p.tenSp}</option>
        ))}
      </select>
      <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ padding: "4px 10px" }}>-</button>
      <span>{quantity}</span>
      <button onClick={() => setQuantity(q => q + 1)} style={{ padding: "4px 10px" }}>+</button>
      <span style={{ marginLeft: 8 }}>Giá: {price.toLocaleString()}đ</span>
      <span style={{ marginLeft: 8 }}>Tổng: {(price * quantity).toLocaleString()}đ</span>
      {selectedId && quantity > 0 && !created && (
        <button
          style={{ marginLeft: 8, background: '#4caf50', color: '#fff', padding: '4px 12px', borderRadius: 4 }}
          onClick={async () => {
            if (onCreate) {
              const result = await onCreate({ orderId, productId: selectedId, quantity, price });
              setCreated(true);
            }
          }}
        >Tạo sản phẩm đơn hàng</button>
      )}
      {created && (
        <button
          style={{ marginLeft: 8, background: 'transparent', border: 'none', cursor: 'pointer' }}
          title="Xóa khỏi đơn hàng"
          onClick={() => onDelete && onDelete({ orderId, productId: selectedId })}
        >
          <span role="img" aria-label="delete">🗑️</span>
        </button>
      )}
    </div>
  );
}
