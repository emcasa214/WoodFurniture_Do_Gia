// src/services/productApi.js
export async function fetchProducts(token) {
  const res = await fetch("http://localhost:5138/product", {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Không lấy được dữ liệu");
  return res.json();
}

export async function addProduct(product, token) {
  const res = await fetch("http://localhost:5138/product/add", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Thêm sản phẩm thất bại");
  return res.json();
}

export async function editProduct(id, product, token){
  const res = await fetch("http://localhost:5138/product/edit/" + id , {
    method: "PUT",
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-Type" : "application/json",
    },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function deleteProduct(id, token){
  const res = await fetch ("http://localhost:5138/product/delete/" + id, {
    method: "DELETE",
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-Type" : "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return res.json();
}