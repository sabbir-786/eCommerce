import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { resetAdminUserPassword } from "@/store/adminUserSlice";

function ResetPasswordDialog({ open, onClose, userId }) {
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await dispatch(resetAdminUserPassword({ id: userId, newPassword: password })).unwrap();
            toast.success("Password reset");
            setPassword("");
            onClose();
        } catch (err) {
            toast.error(err);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reset Password</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" className="w-full">Reset</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default ResetPasswordDialog;
