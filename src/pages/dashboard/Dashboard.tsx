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
import PageHeader from "../../components/PageHeader";

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
    <div className="space-y-8">
      <PageHeader title="Overview" subtitle="Application & Land statistics" />

      <div style={{ fontFamily: "Urbanist, sans-serif" }}>
        <Row gutter={[24, 24]} className="mb-8">
          {[
            { 
              title: "Total", 
              value: data?.totalApplications,
              icon: "📊",
              gradient: "from-blue-500 to-blue-600"
            },
            { 
              title: "Approved", 
              value: data?.approved,
              icon: "✅",
              gradient: "from-green-500 to-green-600"
            },
            { 
              title: "Rejected", 
              value: data?.rejected,
              icon: "❌",
              gradient: "from-red-500 to-red-600"
            },
            { 
              title: "Pending", 
              value: data?.pending,
              icon: "⏳",
              gradient: "from-yellow-500 to-orange-500"
            },
            { 
              title: "In Review", 
              value: data?.review,
              icon: "🔍",
              gradient: "from-purple-500 to-purple-600"
            },
            {
              title: "Revenue (₦)",
              value: data?.revenue?._sum?.paymentAmount || 0,
              icon: "💰",
              gradient: "from-emerald-500 to-teal-600"
            },
          ].map((item, idx) => (
            <Col xs={12} sm={8} md={6} lg={4} key={idx}>
              <Card
                size="small"
                className="text-center font-medium shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${item.gradient.split(' ')[0].replace('from-', '')} 0%, ${item.gradient.split(' ')[1].replace('to-', '')} 100%)`,
                  color: 'white'
                }}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <Statistic
                  title={
                    <span
                      className="text-white/90 font-semibold"
                      style={{
                        fontFamily: "Urbanist, sans-serif",
                      }}
                    >
                      {item.title}
                    </span>
                  }
                  value={item.value || 0}
                  valueStyle={{
                    fontFamily: "Urbanist, sans-serif",
                    fontWeight: 800,
                    color: 'white'
                  }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>


      <Card 
        title={
          <div className="flex items-center gap-2">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <span className="text-lg font-semibold text-gray-800">Application Overview</span>
          </div>
        } 
        className="shadow-xl border-0"
        style={{ height: '400px' }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            style={{ fontFamily: "Urbanist, sans-serif" }}
          >
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <Tooltip
              wrapperStyle={{ 
                fontFamily: "Urbanist, sans-serif",
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}
              labelStyle={{
                fontFamily: "Urbanist, sans-serif",
                fontWeight: 600,
                color: '#374151'
              }}
              itemStyle={{ 
                fontFamily: "Urbanist, sans-serif",
                color: '#667eea'
              }}
              contentStyle={{
                background: 'white',
                border: 'none',
                borderRadius: '8px'
              }}
            />
            <Bar 
              dataKey="value" 
              fill="url(#colorGradient)" 
              radius={[8, 8, 0, 0]}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#764ba2" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Dashboard;
