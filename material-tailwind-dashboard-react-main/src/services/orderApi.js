// Thêm sản phẩm vào đơn hàng theo id
export async function addOrderProductToOrder(orderId, data, token) {
  const res = await fetch(`http://localhost:5138/orderproduct/add-to-order/${orderId}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Thêm sản phẩm vào đơn hàng thất bại");
  return res.json();
}
// Sản phẩm đơn hàng
export async function fetchOrderProducts(orderId, token) {
  const res = await fetch(`http://localhost:5138/orderproduct?orderId=${orderId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Không lấy được sản phẩm đơn hàng");
  return res.json();
}

export async function addOrderProduct(data, token) {
  const res = await fetch("http://localhost:5138/orderproduct/add", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Thêm sản phẩm đơn hàng thất bại");
  return res.json();
}

export async function editOrderProduct(id, data, token) {
  const res = await fetch(`http://localhost:5138/orderproduct/edit/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Sửa sản phẩm đơn hàng thất bại");
  return res.json();
}

export async function deleteOrderProduct(id, token) {
  const res = await fetch(`http://localhost:5138/orderproduct/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Xóa sản phẩm đơn hàng thất bại");
  return res.json();
}
export async function deleteOrderApi(id, token) {
  const res = await fetch(`http://localhost:5138/order/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Xóa đơn hàng thất bại");
  return res.json();
}
export async function fetchOrders(token) {
  const res = await fetch("http://localhost:5138/order", {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Không lấy được dữ liệu");
  return res.json();
}

export async function addOrder(order, token){
  const res = await fetch ("http://localhost:5138/order/add", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error("Thêm đơn hàng thất bại");
  return res.json();
}





// export async function addProduct(product, token) {
//   const res = await fetch("http://localhost:5138/product/add", {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(product),
//   });
//   if (!res.ok) throw new Error("Thêm sản phẩm thất bại");
//   return res.json();
// }

// export async function editProduct(id, product, token){
//   const res = await fetch("http://localhost:5138/product/edit/" + id , {
//     method: "PUT",
//     headers: {
//       "Authorization" : `Bearer ${token}`,
//       "Content-Type" : "application/json",
//     },
//     body: JSON.stringify(product),
//   });
//   return res.json();
export async function editOrderApi(id, order, token) {
  const res = await fetch(`http://localhost:5138/order/edit/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error("Sửa đơn hàng thất bại");
  return res.json();
}
// }

// export async function deleteProduct(id, token){
//   const res = await fetch ("http://localhost:5138/product/delete/" + id, {
//     method: "DELETE",
//     headers: {
//       "Authorization" : `Bearer ${token}`,
//       "Content-Type" : "application/json",
//     },
//     body: JSON.stringify({ id }),
//   });
//   return res.json();
// }