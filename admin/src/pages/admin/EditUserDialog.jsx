import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { updateAdminUser, fetchAdminUsers } from "@/store/adminUserSlice";

function EditUserDialog({ open, onClose, user }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        role: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                userName: user.userName || "",
                email: user.email || "",
                role: user.role || "user",
            });
        }
    }, [user]);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await dispatch(updateAdminUser({ id: user._id, data: formData })).unwrap();
            dispatch(fetchAdminUsers()); // Optional refresh
            onClose();
        } catch (err) {
            console.error("Update failed:", err);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input name="userName" value={formData.userName} onChange={handleChange} placeholder="Username" />
                    <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <Button type="submit">Save Changes</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default EditUserDialog;
