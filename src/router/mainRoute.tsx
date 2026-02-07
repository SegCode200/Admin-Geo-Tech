import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/layouts/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import  Approvals  from "../pages/dashboard/Approval";
import  Settings  from "../pages/dashboard/Settings";
import ApprovalReview from "../pages/dashboard/ApprovalReview";
import Lands from "../pages/dashboard/Lands";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import Login from "../pages/auth/Login";
import Payments from "../pages/dashboard/Payments";

// Layout Component with Sidebar


// Login Page




// Router Setup
const mainRoute = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: 
      <ProtectedRoute>
    <Layout />
    </ProtectedRoute>
    ,
    children: [
      { path: "", element: <Dashboard /> },
    { path: "lands", element: <Lands /> },
      { path: "user-management", element: <Approvals /> },
      { path: "activities", element: <ApprovalReview /> },
      { path: "payment", element: <Payments /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

// App Component
export default mainRoute