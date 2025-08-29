export async function fetchPayment() {
  const res = await fetch("http://localhost:5138/payment", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Không lấy được dữ liệu");
  return res.json();
}

