export async function addCustomer(customer) {
  const res = await fetch("http://localhost:5138/customer/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });
  if (!res.ok) throw new Error("Không thêm được khách hàng");
  return res.json();
}
export async function fetchCustomer() {
  const res = await fetch("http://localhost:5138/customer", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Không lấy được dữ liệu");
  return res.json();
}
