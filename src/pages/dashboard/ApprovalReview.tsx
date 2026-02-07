import { Table, Tag, Spin, Card } from "antd";
import { useActivites } from "../../hooks/userHooks";
import PageHeader from "../../components/PageHeader";
import { useState, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";

const Activities = () => {
  const { activites: data, isLoading } = useActivites();

  // Track screen width
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024); // <1024px => tablet/mobile
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

  // === TABLE COLUMNS FOR DESKTOP ===
  const columns: ColumnsType<any> = [
    {
      title: "CofO No.",
      dataIndex: ["cofO", "cofONumber"],
      ellipsis: true,
    },
    {
      title: "Approver",
      dataIndex: ["approver", "name"],
      render: (name: string, record: any) =>
        `${name || "—"} (${record.approver?.role || "N/A"})`,
    },
    {
      title: "Position",
      dataIndex: ["approver", "position"],
      responsive: ["md"],
    },
    {
      title: "Status",
      dataIndex: ["cofO", "status"],
      render: (status: string) => {
        const color =
          status === "APPROVED"
            ? "green"
            : status === "REJECTED"
            ? "red"
            : status === "PENDING"
            ? "orange"
            : "blue";
        return <Tag color={color}>{status || "N/A"}</Tag>;
      },
    },
    {
      title: "Date",
      dataIndex: "arrivedAt",
      render: (date: string) => new Date(date).toLocaleString(),
    },
  ];

  // === LIST VIEW FOR MOBILE/TABLET ===
  const ListView = () => (
    <div className="grid gap-4">
      {data?.map((item: any) => {
        const status = item?.cofO?.status;
        const color =
          status === "APPROVED"
            ? "green"
            : status === "REJECTED"
            ? "red"
            : status === "PENDING"
            ? "orange"
            : "blue";

        return (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-card border p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-[14px] font-semibold text-gray-800">
                CofO No: {item?.cofO?.cofONumber || "—"}
              </p>
              <Tag color={color}>{status || "N/A"}</Tag>
            </div>

            <p className="text-gray-600 text-[13px]">
              <span className="font-medium">Approver:</span>{" "}
              {item?.approver?.name || "—"} ({item?.approver?.role || "N/A"})
            </p>

            <p className="text-gray-600 text-[13px]">
              <span className="font-medium">Position:</span>{" "}
              {item?.approver?.position || "—"}
            </p>

            <p className="text-gray-600 text-[13px]">
              <span className="font-medium">Date:</span>{" "}
              {new Date(item?.arrivedAt).toLocaleString()}
            </p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="p-3 sm:p-4 md:p-6 font-sans">
      <PageHeader title="Activities" subtitle="Recent CofO and approval activities" />

      <Card
        title={
          <span className="font-semibold text-[16px] sm:text-[18px] text-gray-700">
            All Activities
          </span>
        }
        className="shadow-card rounded-xl overflow-hidden"
        bodyStyle={{ padding: "0.75rem" }}
      >
        {/* Switch based on screen size */}
        {isMobile ? (
          data?.length === 0 ?
          <h2>No Data found</h2> :
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

export default Activities;
