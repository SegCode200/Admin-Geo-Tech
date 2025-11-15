import { Card, Row, Col, Statistic, Spin } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAnalytics } from "../../hooks/userHooks";

const Dashboard = () => {
  const { anlytics: data, isLoading } = useAnalytics();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Spin size="large" />
      </div>
    );

  const chartData = [
    { name: "Approved", value: data?.approved || 0 },
    { name: "Rejected", value: data?.rejected || 0 },
    { name: "Pending", value: data?.pending || 0 },
    { name: "In Review", value: data?.review || 0 },
  ];

  return (
    <div className="p-4 md:p-6">
      <div style={{ fontFamily: "Urbanist, sans-serif" }}>
  <Row gutter={[16, 16]} className="mb-6 font-semibold">
    {[
      { title: "Total", value: data?.totalApplications },
      { title: "Approved", value: data?.approved },
      { title: "Rejected", value: data?.rejected },
      { title: "Pending", value: data?.pending },
      { title: "In Review", value: data?.review },
      {
        title: "Revenue (₦)",
        value: data?.revenue?._sum?.paymentAmount || 0,
      },
    ].map((item, idx) => (
      <Col xs={12} sm={8} md={6} lg={4} key={idx}>
        <Card
          size="small"
          className="text-center font-medium shadow-sm"
          style={{ fontFamily: "Urbanist, sans-serif" }}
        >
          <Statistic
            title={
              <span
                className="text-gray-600"
                style={{
                  fontFamily: "Urbanist, sans-serif",
                  fontWeight: 500,
                }}
              >
                {item.title}
              </span>
            }
            value={item.value || 0}
            valueStyle={{
              fontFamily: "Urbanist, sans-serif",
              fontWeight: 700,
            }}
          />
        </Card>
      </Col>
    ))}
  </Row>
</div>


      <Card title="Application Overview" className="shadow-sm">
        <div
          className="w-full h-[250px] sm:h-[300px]"
          style={{ fontFamily: "Urbanist, sans-serif" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              style={{ fontFamily: "Urbanist, sans-serif" }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                wrapperStyle={{ fontFamily: "Urbanist, sans-serif" }}
                labelStyle={{
                  fontFamily: "Urbanist, sans-serif",
                  fontWeight: 600,
                }}
                itemStyle={{ fontFamily: "Urbanist, sans-serif" }}
              />
              <Bar dataKey="value" fill="#1677ff" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
