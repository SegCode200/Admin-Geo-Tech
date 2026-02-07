import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/authSlice";
import { Input, Avatar, Dropdown, Menu as AntMenu, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { logoutAdmin } from "../../api/authApi";

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAdmin();
    } catch (err) {
      // ignore
    }
    message.success("Logged out");
    navigate("/");
  };

  const menu = (
    <AntMenu>
      <AntMenu.Item key="1" onClick={() => navigate('/dashboard/settings')}>Profile</AntMenu.Item>
      <AntMenu.Divider />
      <AntMenu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>Logout</AntMenu.Item>
    </AntMenu>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-gray-800 text-white transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static`}
      >
        <div className="p-5 flex justify-between items-center md:block">
          <h2 className="text-xl font-bold">{user?.name}</h2>

          {/* Close button for mobile */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="px-5 pb-6 space-y-2">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => `block p-3 rounded-md transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/activities"
                className={({ isActive }) => `block p-3 rounded-md transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                Activities
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/lands"
                className={({ isActive }) => `block p-3 rounded-md transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                Land Registrations
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/payment"
                className={({ isActive }) => `block p-3 rounded-md transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                Payment Reports
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/user-management"
                className={({ isActive }) => `block p-3 rounded-md transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                User Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) => `block p-3 rounded-md transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                Roles Management
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Overlay when sidebar is open (mobile only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col ">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white shadow px-4 py-3 md:px-6 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* Menu toggle (mobile) */}
            <button
              className="text-gray-700 md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu size={24} />
            </button>

            <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">Dashboard</h1>

            <div className="hidden sm:block">
              <Input.Search placeholder="Search..." style={{ width: 360 }} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-gray-600">👤 {user?.role}</div>

            <Dropdown overlay={menu} placement="bottomRight">
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar size={36} style={{ backgroundColor: '#fde68a', color: '#92400e' }}>
                  {user?.name?.[0] || 'A'}
                </Avatar>
                <div className="hidden sm:block text-sm">
                  <div className="font-medium text-gray-800">{user?.name || 'Admin'}</div>
                  <div className="text-xs text-gray-500">{user?.role}</div>
                </div>
              </div>
            </Dropdown>
          </div>
        </header>

        {/* Main Outlet Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
