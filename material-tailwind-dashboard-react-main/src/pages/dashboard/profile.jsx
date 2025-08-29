import React, { useEffect, useState } from "react";
import {fetchOrders, deleteOrderApi } from "@/services/orderApi";
import { ModalBeforeOrder }  from "@/widgets/layout/modalBeforeOrder";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button, 
} from "@material-tailwind/react";  
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { use } from "react";



export function Profile() {
  const [listO, setListO] = useState([]);
  const [error, setError] = useState("");
  const [openBeforeModal, setOpenBeforeModal] = useState(false);
  const [editOrder, setEditOrder] = useState(null); // đơn hàng đang sửa
  const [openEditModal, setOpenEditModal] = useState(false); // modal sửa

  console.log("edit order", editOrder);

  const reloadOrders = () => {
    const token = localStorage.getItem("token");
    fetchOrders(token)
      .then(setListO)
      .catch((err) => {
        console.error("Lỗi khi lấy danh sách đơn hàng:", err);
        setError("Không thể lấy danh sách đơn hàng");
      });
  };
  
  useEffect(() => { reloadOrders(); }, []);

  const handleOrderCreated = (created) => {
    reloadOrders();
    setOpenBeforeModal(false); // đảm bảo đóng modal đầu
  };

  const handleOrderUpdated = (updated) => {
    reloadOrders();
    setEditOrder(null);
    setOpenEditModal(false);
  };

  // Xử lý xóa đơn hàng
  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) return;
    const token = localStorage.getItem("token");
    try {
      await deleteOrderApi(id, token);
      reloadOrders();
    } catch (err) {
      setError("Xóa đơn hàng thất bại");
    }
  };
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {/* bảng 1  */}
      <Card>
        {/* tiêu đề của bảng  */}
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex items-center justify-between">
          <Typography variant="h6" color="white">
            Danh sách đơn hàng
          </Typography>
          <div className="flex gap-2">
            <Button color="green" onClick={()=> setOpenBeforeModal(true)}>
              Thêm đơn hàng
            </Button>

          </div>
        </CardHeader>

      {/* Modal tạo đơn hàng mới */}
      <ModalBeforeOrder 
        open={openBeforeModal} 
        onClose={()=> setOpenBeforeModal(false)}
        onOrderCreated={handleOrderCreated}
      />

      {/* Modal sửa đơn hàng */}
      <ModalBeforeOrder
        open={openEditModal}
        onClose={() => { setOpenEditModal(false); setEditOrder(null); }}
        onOrderCreated={handleOrderUpdated}
        editOrder={editOrder}
      />

      {/* thân bảng  */}
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        {error && (
          <Typography color="red" className="mb-4">
            {error}
          </Typography>
        )}
        <table className="w-full min-w-[640px] table-auto">
          {/* tên các cột  */}
           <thead>
            <tr>
              {["STT", "Mã Đơn Hàng", "Tên Khách Đặt", "Địa Chỉ", "Ngày Đặt", "Trạng Thái", "Thao Tác", ""].map((el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 py-3 px-5 text-left"
                >
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    {el}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          {/* dữ liệu các cột  */}
          <tbody>
            {listO.map((order, idx) => (
              <tr key={order.id}>
                <td className="py-3 px-5">{idx + 1}</td>
                <td className="py-3 px-5">{order.id}</td>
                <td className="py-3 px-5">{order.tenKhachHang}</td>
                <td className="py-3 px-5">{order.diaChi}</td>
                <td className="py-3 px-5">{
                  (() => {
                    if (!order.ngayDat) return "";
                    const d = new Date(order.ngayDat);
                    const pad = n => n.toString().padStart(2, '0');
                    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
                  })()
                }</td>
                <td className="py-3 px-5">{
                  (() => {
                    const statusMap = {
                      0: "Chờ xác nhận",
                      1: "Đang giao",
                      2: "Hoàn thành",
                      3: "Đã hủy"
                    };
                    return statusMap[order.trangThai] ?? order.trangThai;
                  })()
                }</td>
                <td className="py-3 px-5 flex gap-2">
                  <Button
                    color="blue"
                    size="sm"
                    onClick={() => {
                      setEditOrder(order);
                      setOpenEditModal(true);
                    }}
                  >
                    Sửa
                  </Button>
                  <Button color="red" size="sm" onClick={() => handleDeleteOrder(order.id)}>
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
    </div>
  );
}


export default Profile;
