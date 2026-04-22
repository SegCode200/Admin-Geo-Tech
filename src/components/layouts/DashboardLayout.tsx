import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LayoutDashboard, Activity, MapPin, CreditCard, Users, Settings } from "lucide-react";
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
    <div className="flex h-screen" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-40 w-64 h-full text-white transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:static`}
          style={{ background: 'var(--sidebar-bg)' }}
        >
          <div className="p-6 flex justify-between items-center md:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {user?.name}
              </h2>
            </div>

            {/* Close button for mobile */}
            <button
              className="md:hidden text-white hover:text-gray-300 transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={22} />
            </button>
          </div>

        <nav className="px-6 pb-6 space-y-2">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'hover:bg-white/10 text-gray-300 hover:text-white'}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <LayoutDashboard size={20} />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/activities"
                className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'hover:bg-white/10 text-gray-300 hover:text-white'}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Activity size={20} />
                Activities
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/lands"
                className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'hover:bg-white/10 text-gray-300 hover:text-white'}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <MapPin size={20} />
                Land Registrations
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/payment"
                className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'hover:bg-white/10 text-gray-300 hover:text-white'}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <CreditCard size={20} />
                Payment Reports
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/user-management"
                className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'hover:bg-white/10 text-gray-300 hover:text-white'}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Users size={20} />
                User Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'hover:bg-white/10 text-gray-300 hover:text-white'}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Settings size={20} />
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
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white/80 backdrop-blur-md shadow-lg px-6 py-4 md:px-8 sticky top-0 z-20 border-b border-white/20">
          <div className="flex items-center gap-4">
            {/* Menu toggle (mobile) */}
            <button
              className="text-gray-700 md:hidden hover:text-blue-600 transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu size={24} />
            </button>

            <h1 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
              Dashboard
            </h1>

            <div className="hidden sm:block">
              <Input.Search 
                placeholder="Search..." 
                style={{ width: 360, borderRadius: '12px' }}
                className="shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-gray-600 font-medium px-3 py-1 bg-gray-100 rounded-full">
              👤 {user?.role}
            </div>

            <Dropdown overlay={menu} placement="bottomRight">
              <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <Avatar 
                  size={40} 
                  style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  {user?.name?.[0] || 'A'}
                </Avatar>
                <div className="hidden sm:block text-sm">
                  <div className="font-semibold text-gray-800">{user?.name || 'Admin'}</div>
                  <div className="text-xs text-gray-500">{user?.role}</div>
                </div>
              </div>
            </Dropdown>
          </div>
        </header>

        {/* Main Outlet Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="container mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
