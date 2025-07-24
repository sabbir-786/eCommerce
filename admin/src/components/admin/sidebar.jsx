// admin-sidebar.jsx

import {
    LayoutDashboard,
    User2,
    BarChart2,
    ShoppingBasket,
    BadgeCheck,
    ChevronDown,
    ChevronRight,
    Puzzle,
    Contact2,
    CalendarClock,
    BookType,
    Layers,
} from "lucide-react";

import { useState, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const sections = [
    {
        title: "MENU",
        items: [
            { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin/home" },
        ],
    },
    {
        title: "PAGES",
        items: [
        ],
    },
    {
        title: "APPS",
        items: [
            { id: "user", label: "User", icon: <User2 size={18} />, path: "/admin/user" },

            { id: "categories", label: "Categories", icon: <BarChart2 size={18} />, path: "/admin/categories" },
            { id: "products", label: "Products", icon: <ShoppingBasket size={18} />, path: "/admin/products" },
            { id: "orders", label: "Orders", icon: <BadgeCheck size={18} />, path: "/admin/orders" },
        ],
    },
    {
        title: "GENERAL",
        items: [
            { id: "contacts", label: "Contacts", icon: <Contact2 size={18} />, path: "/admin/contacts" },
            { id: "calendar", label: "Calendar", icon: <CalendarClock size={18} />, path: "/admin/calendar" },
            { id: "components", label: "Components", icon: <Puzzle size={18} />, path: "/admin/components" },
            { id: "widgets", label: "Widgets", icon: <BookType size={18} />, path: "/admin/widgets" },
            { id: "ui", label: "Extended UI", icon: <Layers size={18} />, path: "/admin/ui" },
        ],
    },
];

function MenuItems({ setOpen }) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
        if (setOpen) setOpen(false);
    };

    return (
        <div className="mt-6 flex flex-col gap-4">
            {sections.map((section) => (
                <div key={section.title}>
                    <div className="text-xs font-medium text-muted-foreground mb-2 px-2 uppercase tracking-wider">
                        {section.title}
                    </div>
                    <div className="flex flex-col gap-1">
                        {section.items.map((item) => {
                            const isActive = location.pathname.startsWith(item.path);
                            return (
                                <div
                                    key={item.id}
                                    onClick={() => handleNavigate(item.path)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer text-sm
                                        ${isActive
                                            ? "bg-muted text-foreground font-semibold"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function AdminSidebar({ open, setOpen }) {
    const navigate = useNavigate();

    return (
        <Fragment>
            {/* Mobile Sidebar */}
            <aside className="lg:hidden">
                {open && (
                    <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setOpen(false)}></div>
                )}
                <div className={`fixed left-0 top-0 z-50 h-full w-64 bg-background shadow-lg transform transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="p-6 border-b">
                        <div onClick={() => navigate("/admin/home")} className="flex items-center gap-2 cursor-pointer">
                            <LayoutDashboard size={24} />
                            <h1 className="text-xl font-bold">Admin Panel</h1>
                        </div>
                    </div>
                    <div className="p-4 overflow-y-auto">
                        <MenuItems setOpen={setOpen} />
                    </div>
                </div>
            </aside>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 h-full border-r bg-background p-6">
                <div onClick={() => navigate("/admin/home")} className="flex items-center gap-2 cursor-pointer mb-6">
                    <LayoutDashboard size={24} />
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                </div>
                <MenuItems />
            </aside>
        </Fragment>
    );
}
