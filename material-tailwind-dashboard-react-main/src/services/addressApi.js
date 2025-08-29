export async function addAddress(address) {
  const res = await fetch("http://localhost:5138/address/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  });
  if (!res.ok) throw new Error("Không thêm được địa chỉ");
  return res.json();
}
export async function fetchAddressForId(customerId) {
  const res = await fetch(`http://localhost:5138/address/cusId/${customerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Không lấy được dữ liệu");
  return res.json();
}
