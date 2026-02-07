import { useEffect, useState } from "react";
import { Table, Tag, Spin, Card, Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getAllLands, approveUserLand, rejectUserLand } from "../../api/landApi";
import { LandRegistration } from "../../types/types";
import PageHeader from "../../components/PageHeader";

const Lands = () => {
  const [lands, setLands] = useState<LandRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchLands = async () => {
    setLoading(true);
    try {
      const res = await getAllLands();
      setLands(res?.lands || []);
    } catch (err: any) {
      message.error(err?.message || "Failed to load lands");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLands();
  }, []);

  console.log(lands)

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      await approveUserLand(id);
      message.success("Land approved");
      await fetchLands();
    } catch (err: any) {
      message.error(err?.message || "Approve failed");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    setActionLoading(id);
    try {
      await rejectUserLand(id);
      message.success("Land rejected");
      await fetchLands();
    } catch (err: any) {
      message.error(err?.message || "Reject failed");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Spin size="large" />
      </div>
    );

  const columns: ColumnsType<LandRegistration> = [
    { title: "Owner Name", dataIndex: "ownerName", key: "ownerName", ellipsis: true },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
      render: (v: string) => v || "—",
      responsive: ["sm"],
    },
    {
      title: "Ownership Type",
      dataIndex: "ownershipType",
      key: "ownershipType",
      render: (v: string) => v || "—",
      responsive: ["sm"],
    },
    {
      title: "Size (m²)",
      dataIndex: "squareMeters",
      key: "squareMeters",
      render: (v: number) => (v ? `${v}` : "—"),
      responsive: ["md"],
    },
    {
      title: "Status",
      dataIndex: "landStatus",
      key: "status",
      render: (status: string) => {
        const color =
          status === "APPROVED"
            ? "green"
            : status === "REJECTED"
            ? "red"
            : "orange";
        return <Tag color={color}>{status || "PENDING"}</Tag>;
      },
    },
    {
      title: "Documents",
      dataIndex: "documents",
      key: "documents",
      render: (docs: any[]) => (
        <div className="flex gap-2 flex-wrap">
          {docs?.map((d) => (
            <a key={d.id} href={d.documentUrl} target="_blank" rel="noreferrer" className="text-blue-600 text-xs truncate max-w-[80px]">
              {d.fileName}
            </a>
          ))}
        </div>
      ),
      responsive: ["md"],
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (d: string) => (d ? new Date(d).toLocaleDateString() : "—"),
      responsive: ["md"],
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: LandRegistration) => (
        <div className="flex gap-2">
          <Popconfirm
            title="Approve this land?"
            onConfirm={() => handleApprove(record.id)}
            okText="Yes"
            cancelText="No"
            disabled={record.landStatus === "APPROVED"}
          >
            <Button type="primary" disabled={record.landStatus === "APPROVED"} loading={actionLoading === record.id}>
              Approve
            </Button>
          </Popconfirm>

          <Popconfirm
            title="Reject this land?"
            onConfirm={() => handleReject(record.id)}
            okText="Yes"
            cancelText="No"
            disabled={record.landStatus === "REJECTED"}
          >
            <Button danger disabled={record.landStatus === "REJECTED"} loading={actionLoading === record.id}>
              Reject
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-3 sm:p-4 md:p-6 font-sans">
      <PageHeader title="Land Registrations" subtitle="View and manage submitted land registrations" />

      <Card
        title={<span className="font-semibold text-[16px] sm:text-[18px] text-gray-700">All Land Records</span>}
        className="shadow-card rounded-xl overflow-hidden"
        bodyStyle={{ padding: "0.75rem" }}
      >
        {isMobile ? (
          <div className="grid gap-4">
            {lands?.map((l) => (
              <div key={l.id} className="bg-white p-4 rounded-xl shadow-card border">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{l.ownerName}</div>
                    <div className="text-xs text-gray-500">{l.purpose} • {l.ownershipType}</div>
                  </div>
                  <Tag color={l.landStatus === 'APPROVED' ? 'green' : l.landStatus === 'REJECTED' ? 'red' : 'orange'}>{l.landStatus}</Tag>
                </div>

                <div className="text-xs text-gray-600 mb-3">Size: {l.squareMeters} m² • {new Date(l.createdAt).toLocaleDateString()}</div>

                <div className="flex gap-2">
                  <Popconfirm title="Approve this land?" onConfirm={() => handleApprove(l.id)} okText="Yes" cancelText="No" disabled={l.landStatus === 'APPROVED'}>
                    <Button type="primary" size="small" disabled={l.landStatus === 'APPROVED'} loading={actionLoading === l.id}>Approve</Button>
                  </Popconfirm>

                  <Popconfirm title="Reject this land?" onConfirm={() => handleReject(l.id)} okText="Yes" cancelText="No" disabled={l.landStatus === 'REJECTED'}>
                    <Button danger size="small" disabled={l.landStatus === 'REJECTED'} loading={actionLoading === l.id}>Reject</Button>
                  </Popconfirm>

                  <div className="ml-auto text-xs text-blue-600">
                    {l.documents?.length ? (
                      <a href={l.documents[0].documentUrl} target="_blank" rel="noreferrer">{l.documents[0].fileName}</a>
                    ) : '—'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Table
            className="font-sans text-[14px]"
            columns={columns}
            dataSource={lands || []}
            rowKey="id"
            pagination={{ pageSize: 10, responsive: true }}
            scroll={{ x: 800 }}
          />
        )}
      </Card>
    </div>
  );
};

export default Lands;
