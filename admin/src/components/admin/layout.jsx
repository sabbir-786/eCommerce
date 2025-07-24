import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar"; // <-- This should point to ModernAdminSidebar
import AdminHeader from "./header";

function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false); // For desktop sidebar
    const [openSidebar, setOpenSidebar] = useState(false); // For mobile sidebar

    return (
        <div className="flex h-screen bg-gray-100 text-black">
            {/* Sidebar */}
            <AdminSideBar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                open={openSidebar}
                setOpen={setOpenSidebar}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <AdminHeader
                    setOpen={setOpenSidebar} // For mobile menu
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />

                {/* Page content from routes */}
                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
