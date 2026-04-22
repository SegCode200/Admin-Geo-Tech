import PageHeader from "../components/PageHeader";
import { Card } from "antd";

const Profile = () => {
  return (
    <div>
      <PageHeader title="Profile" subtitle="Your account information" />

      <Card className="rounded-xl shadow-card">
        <p className="text-gray-700">Profile details will be available here.</p>
      </Card>
    </div>
  );
}

export default Profile