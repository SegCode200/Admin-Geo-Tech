import { Table, Tabs, Tag, Spin, Card } from "antd";
import { useInternalUser, useUser } from "../../hooks/userHooks";
import PageHeader from "../../components/PageHeader";
import { useEffect, useState } from "react";

const Users = () => {
  const { user: applicants, isLoading: loadingUsers } = useUser();
  const { internalUser: internalUsers, isLoading: loadingInternal } = useInternalUser();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loadingUsers || loadingInternal)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Spin size="large" />
      </div>
    );

  // 🖥 Desktop Columns
  const applicantCols = [
    { title: "Full Name", dataIndex: "fullName" },
    { title: "Email", dataIndex: "email", ellipsis: true },
    {
      title: "Created",
      dataIndex: "createdAt",
      render: (d: string) => new Date(d).toLocaleDateString(),
      responsive: ["sm" as const],
    },
  ];

  const internalCols = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email", ellipsis: true },
    {
      title: "Role",
      dataIndex: "role",
      render: (role: string) => <Tag color="blue">{role}</Tag>,
    },
    { title: "State", dataIndex: ["state", "name"], render: (v:any) => v || "—" },
    {
      title: "Position",
      dataIndex: "position",
      responsive: ["sm" as const],
    },
  ];

  // 📱 List View for Mobile / Tablet
  const ApplicantListView = () => (
    <div className="grid gap-4">
      {applicants?.map((user: any) => (
        <div
          key={user.id}
          className="bg-white rounded-xl shadow-card border p-4 font-sans"
        >
          <p className="text-[14px] font-semibold text-gray-800 mb-1">
            {user.fullName}
          </p>
          <p className="text-gray-600 text-[13px] truncate">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p className="text-gray-600 text-[13px]">
            <span className="font-medium">Created:</span>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );

  const InternalUserListView = () => (
    <div className="grid gap-4">
      {internalUsers?.map((user: any) => (
        <div
          key={user.id}
          className="bg-white rounded-xl shadow-card border p-4 font-sans"
        >
          <div className="flex justify-between items-center mb-2">
            <p className="text-[14px] font-semibold text-gray-800">{user.name}</p>
            <Tag color="blue">{user.role}</Tag>
          </div>
          <p className="text-gray-600 text-[13px] truncate">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p className="text-gray-600 text-[13px]">
            <span className="font-medium">State:</span>{" "}
            {user.state?.name || "—"}
          </p>
          <p className="text-gray-600 text-[13px]">
            <span className="font-medium">Position:</span>{" "}
            {user.position || "—"}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-3 sm:p-4 md:p-6 font-sans">
      <PageHeader title="User Management" subtitle="Manage applicants and internal users" />

      <Card
        title={
          <span className="font-semibold text-[16px] sm:text-[18px] text-gray-700">
            User Management
          </span>
        }
        className="shadow-card rounded-xl overflow-hidden"
        bodyStyle={{ padding: "0.75rem" }}
      >
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "Applicants",
              children: isMobile ? (
                applicants?.length === 0 ?<h1>No Applicants Yet</h1>:
                <ApplicantListView />
              ) : (
                <Table
                  className="font-sans text-[14px]"
                  columns={applicantCols}
                  dataSource={applicants || []}
                  rowKey="id"
                  pagination={{
                    pageSize: 10,
                    responsive: true,
                  }}
                  scroll={{ x: 700 }}
                />
              ),
            },
            {
              key: "2",
              label: "Internal Users",
              children: isMobile ? (
                internalUsers?.length === 0 ?<h1>No Internal User Yet</h1>:
                <InternalUserListView />
              ) : (
                <Table
                  className="font-sans text-[14px]"
                  columns={internalCols}
                  dataSource={internalUsers || []}
                  rowKey="id"
                  pagination={{
                    pageSize: 10,
                    responsive: true,
                  }}
                  scroll={{ x: 700 }}
                />
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default Users;
