import { Table, Tag, Spin, Card } from "antd";
import { usePayments } from "../../hooks/userHooks";
import { useState, useEffect } from "react";

const Payments = () => {
  const { payments: data, isLoading } = usePayments();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Spin size="large" />
      </div>
    );

  // 🖥 DESKTOP TABLE COLUMNS
  const columns = [
    {
      title: "CofO No.",
      dataIndex: "cofONumber",
      ellipsis: true,
      width: 150,
    },
    {
      title: "Applicant",
      dataIndex: ["user", "fullName"],
      ellipsis: true,
      width: 200,
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      ellipsis: true,
      responsive: ["md"],
      width: 220,
    },
    {
      title: "Payment Ref",
      dataIndex: "paymentRef",
      ellipsis: true,
      width: 200,
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      render: (status: string) => {
        const color =
          status === "SUCCESS"
            ? "green"
            : status === "PENDING"
            ? "orange"
            : "red";
        return <Tag color={color}>{status}</Tag>;
      },
      width: 120,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
      responsive: ["sm"],
      width: 160,
    },
  ];

  // 📱 MOBILE/TABLET LIST VIEW
  const ListView = () => (
    <div className="grid gap-4">
      {data?.map((item: any) => {
        const status = item.paymentStatus;
        const color =
          status === "SUCCESS"
            ? "green"
            : status === "PENDING"
            ? "orange"
            : "red";

        return (
          <div
            key={item.id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-[14px] font-semibold text-gray-800">
                CofO No: {item.cofONumber || "—"}
              </p>
              <Tag color={color}>{status}</Tag>
            </div>

            <p className="text-gray-600 text-[13px]">
              <span className="font-medium">Applicant:</span>{" "}
              {item?.user?.fullName || "—"}
            </p>

            <p className="text-gray-600 text-[13px] truncate">
              <span className="font-medium">Email:</span>{" "}
              {item?.user?.email || "—"}
            </p>

            <p className="text-gray-600 text-[13px] truncate">
              <span className="font-medium">Payment Ref:</span>{" "}
              {item.paymentRef || "—"}
            </p>

            <p className="text-gray-600 text-[13px]">
              <span className="font-medium">Date:</span>{" "}
              {new Date(item.createdAt).toLocaleString()}
            </p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="p-3 sm:p-4 md:p-6 font-sans">
      <Card
        title={
          <span className="font-semibold text-[16px] sm:text-[18px] text-gray-700">
            Payment Monitoring
          </span>
        }
        className="shadow-sm rounded-lg overflow-hidden"
        bodyStyle={{ padding: "0.75rem" }}
      >
        {isMobile ? (
            data?.length === 0 ? <h1>No Data yet</h1>:
          <ListView />
        ) : (
          <Table
            className="font-sans text-[14px]"
            columns={columns}
            dataSource={data || []}
            rowKey="id"
            pagination={{
              pageSize: 10,
              responsive: true,
            }}
            scroll={{ x: 700 }}
          />
        )}
      </Card>
    </div>
  );
};

export default Payments;
