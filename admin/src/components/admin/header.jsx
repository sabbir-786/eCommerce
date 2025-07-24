import React from 'react';
import { Button } from '../ui/button';
import { AlignJustify, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '@/store/adminAuthSlice';
import { useSonner } from 'sonner';

function AdminHeader({ setOpen, collapsed, setCollapsed }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useSonner();

    async function handleLogout() {
        try {
            const result = await dispatch(adminLogout());

            if (result.meta.requestStatus === "fulfilled") {
                toast.success("Logged out successfully");
                navigate("/auth/login");
            } else {
                toast.error("Logout failed");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        }
    }

    return (
        <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
            <div className="flex items-center gap-2">
                {/* Mobile menu toggle */}
                <Button onClick={() => setOpen(true)} className="lg:hidden sm:block p-2">
                    <AlignJustify size={20} />
                    <span className="sr-only">Toggle Menu</span>
                </Button>

                {/* Desktop sidebar collapse toggle */}
                <Button
                    onClick={() => setCollapsed(prev => !prev)}
                    className="hidden lg:inline-flex p-2"
                    variant="ghost"
                >
                    <AlignJustify size={20} />
                </Button>
            </div>

            {/* Logout Button (Right Aligned) */}
            <div className="flex flex-1 justify-end">
                <Button
                    onClick={handleLogout}
                    className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
                >
                    <LogOut size={18} />
                    Logout
                </Button>
            </div>
        </header>
    );
}

export default AdminHeader;
