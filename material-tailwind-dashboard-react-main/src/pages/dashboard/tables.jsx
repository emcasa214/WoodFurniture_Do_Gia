import React, { useEffect, useState } from "react";
import { fetchProducts, addProduct, editProduct, deleteProduct} from "@/services/productApi";
window.addProduct = addProduct;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
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
import {Modal} from "@/widgets/layout/modal";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";


export function Tables() {
  const [listp, setListp] = useState([]);
  const [error, setError] = useState("");
  // trạng thái modal thêm 
  const[openModal, setOpenModal] = useState(false);
  // trạng thái modal sửa
  const[editModalOpen, setEditModalOpen] = useState(false);
  const [editProductData, setEditProductData] = useState(null);
  // trạng thái modal xác nhận xóa
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  // QR scan states
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrScanError, setQrScanError] = useState("");
  const [qrLoading, setQrLoading] = useState(false);

  // hiển thị danh sách sp khi load trang 
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchProducts(token)
      .then(setListp)
      .catch(err => setError(err.message));
  }, []);
  console.log("listp", listp);


  // Khởi tạo html5-qrcode khi mở modal
  useEffect(() => {
    let qrCodeScanner;
    function startScanner() {
      if (!window.Html5Qrcode) return;
      try {
        qrCodeScanner = new window.Html5Qrcode("qr-reader");
        qrCodeScanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          (qrCodeMessage) => {
            console.log("QR scanned:", qrCodeMessage);
            const el = document.getElementById("qr-result");
            if (el) el.innerText = "Mã sản phẩm: " + qrCodeMessage;
            handleQrScan(qrCodeMessage);
            qrCodeScanner.stop().catch(() => {});
          },
          (errorMessage) => {
            // ignore scan errors
          }
        ).catch(() => {});
      } catch (e) {
        // ignore
      }
    }
    if (qrModalOpen) {
      if (!window.Html5Qrcode) {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/html5-qrcode";
        script.async = true;
        script.onload = startScanner;
        document.body.appendChild(script);
      } else {
        startScanner();
      }
    }
    return () => {
      if (qrCodeScanner) {
        qrCodeScanner.stop().catch(() => {});
        try { qrCodeScanner.clear(); } catch(e){}
      }
      const qrReader = document.getElementById("qr-reader");
      if (qrReader) qrReader.innerHTML = "";
      const qrResult = document.getElementById("qr-result");
      if (qrResult) qrResult.innerText = "";
    };
  }, [qrModalOpen]);

  // hàm thêm sản phẩm mới
  const handleAddProduct = (product) => {
    const token = localStorage.getItem("token");
    addProduct(product, token)
      .then(res => {
        setListp(prev => [...prev, res.product]);
        setOpenModal(false);
      })
      .catch(err => {
        setError(err.message);
      });
  };

  // Hàm đọc mã QR và parse JSON để gọi API thêm sản phẩm
  const handleQrScan = (qrCodeMessage) => {
    setQrScanError("");
    setQrLoading(true);
  console.log("handleQrScan received:", qrCodeMessage);
    try {
      const product = JSON.parse(qrCodeMessage); // expecting QR to contain JSON product
      handleAddProduct(product);
      alert("Đã thêm sản phẩm: " + (product.tenSp || "(no name)"));
      setQrModalOpen(false);
    } catch (err) {
      setQrScanError("QR không đúng định dạng JSON sản phẩm!");
    }
    setQrLoading(false);
  };

  const handleEditProduct = (id, product) => {
    const token = localStorage.getItem("token");
    editProduct(id, product, token)
      .then(res => {
        setListp(prev => prev.map(item => 
          item.id === id ? res.product : item
        ));
        setEditModalOpen(false);
      })
      .catch(err => {
        setError(err.message);
      });
  }
  
  const handleOpenDeleteConfirm = (id) => {
    setDeleteProductId(id);
    setDeleteConfirmOpen(true);
  };
  const handleDeleteProduct = () => {
    const token = localStorage.getItem("token");
    deleteProduct(deleteProductId, token)
      .then(res => {
        setListp(prev => prev.filter(item => item.id !== deleteProductId));
        setDeleteConfirmOpen(false);
      })
      .catch(err => {
        setError(err.message);
        setDeleteConfirmOpen(false);
      });
  };

  // render giao diện
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {/* bảng 1  */}
      <Card>
        {/* tiêu đề của bảng  */}
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex items-center justify-between">
          <Typography variant="h6" color="white">
            Danh sách sản phẩm
          </Typography>
          <div className="flex gap-2">
            <Button color="green" onClick={() => setOpenModal(true)}>
              Thêm sản phẩm
            </Button>
            <Button color="blue" onClick={() => setQrModalOpen(true)}>
              📷 Thêm bằng QR
            </Button>
          </div>
        </CardHeader>

        {/* Modal quét QR code */}
        {qrModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-[340px]">
              <Typography variant="h6" color="blue">
                Quét QR sản phẩm
              </Typography>
              <div id="qr-reader" style={{ width: 300, margin: "16px auto" }}></div>
              <div id="qr-result" style={{ marginTop: 8, color: "green" }}></div>
              {qrScanError && <Typography color="red">{qrScanError}</Typography>}
              <div className="flex gap-4 mt-4 justify-end">
                <Button color="gray" onClick={() => setQrModalOpen(false)} disabled={qrLoading}>Đóng</Button>
              </div>
            </div>
          </div>
        )}

        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          initialData={{}} // hoặc null
          onSubmit={handleAddProduct}
          title="Thêm sản phẩm mới"
        />

        <Modal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          initialData={editProductData || {}}
          onSubmit={(data) => {
            if (editProductData) {
              handleEditProduct(editProductData.id, data);
              setEditModalOpen(false);
            }
          }}
          title="Sửa sản phẩm"
        />
        {deleteConfirmOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <Typography variant="h6" color="red">
                Bạn có chắc chắn muốn xóa sản phẩm này?
              </Typography>
              <div className="flex gap-4 mt-4 justify-end">
                <Button color="red" onClick={handleDeleteProduct}>Xác nhận</Button>
                <Button color="gray" onClick={() => setDeleteConfirmOpen(false)}>Hủy</Button>
              </div>
            </div>
          </div>
        )}

  {/* legacy/modal placeholder removed - using prop-based Modal above */}

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
                {["STT", "Tên sản phẩm", "Giá", "Chất liệu", "Kích thước", "Tình Trạng", "Thao Tác", ""].map((el) => (
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
              {listp.map((product, idx) => (
                <tr key={product.id}>
                  <td className="py-3 px-5">{idx + 1}</td>
                  <td className="py-3 px-5">{product.tenSp}</td>
                  <td className="py-3 px-5">
                    {product.gia != null ? Number(product.gia).toLocaleString() + "₫" : "-"}
                  </td>
                  <td className="py-3 px-5">{product.chatLieu}</td>
                  <td className="py-3 px-5">{product.kichThuoc}</td>
                  <td className="py-3 px-5">{product.tinhTrang}</td>
                  <td className="py-3 px-5 flex gap-2">
                    <Button
                      color="blue"
                      size="sm"
                      onClick={() => {
                        setEditProductData(product); // truyền toàn bộ object
                        setEditModalOpen(true);
                      }}
                    >
                      Sửa
                    </Button>
                    <Button color="red" size="sm" onClick={() => handleOpenDeleteConfirm(product.id)}>
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
     
      {/* bảng 2  */}
      {/* <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Projects Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["companies", "members", "budget", "completion", ""].map(
                  (el) => (
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
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {projectsTableData.map(
                ({ img, name, members, budget, completion }, key) => {
                  const className = `py-3 px-5 ${
                    key === projectsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        {members.map(({ img, name }, key) => (
                          <Tooltip key={name} content={name}>
                            <Avatar
                              src={img}
                              alt={name}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${
                                key === 0 ? "" : "-ml-2.5"
                              }`}
                            />
                          </Tooltip>
                        ))}
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {budget}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="w-10/12">
                          <Typography
                            variant="small"
                            className="mb-1 block text-xs font-medium text-blue-gray-600"
                          >
                            {completion}%
                          </Typography>
                          <Progress
                            value={completion}
                            variant="gradient"
                            color={completion === 100 ? "green" : "gray"}
                            className="h-1"
                          />
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          <EllipsisVerticalIcon
                            strokeWidth={2}
                            className="h-5 w-5 text-inherit"
                          />
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card> */}
      {/* Floating QR button (always visible) */}
      {/* <div className="fixed bottom-6 right-6 z-50">
        <Button color="blue" onClick={() => setQrModalOpen(true)} className="shadow-lg">
          📷 Quét QR
        </Button>
      </div> */}

    </div>
  );
}

export default Tables;

