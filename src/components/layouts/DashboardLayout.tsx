import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/authSlice";

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSelector(selectUser)
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
              <Link
                to="/dashboard"
                className="block p-2 hover:bg-gray-700 rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/activities"
                className="block p-2 hover:bg-gray-700 rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                Activities
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/payment"
                className="block p-2 hover:bg-gray-700 rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                Payment Reports
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/user-management"
                className="block p-2 hover:bg-gray-700 rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                User Management
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/settings"
                className="block p-2 hover:bg-gray-700 rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                Roles Management
              </Link>
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
          {/* Menu toggle (mobile) */}
          <button
            className="text-gray-700 md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={24} />
          </button>

          <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>

          <div className="hidden md:block text-gray-600">👤 {user?.role}</div>
        </header>

        {/* Main Outlet Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
