import User from "../../models/user.js";
import bcrypt from "bcryptjs";

// GET all users
// GET /api/admin/users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password").sort({ createdAt: -1 }); // Exclude password
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ success: false, message: "Server error while fetching users" });
    }
};


export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { userName, email, role } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { userName, email, role },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        console.error("Update user error:", error);
        res.status(500).json({ success: false, message: "Failed to update user" });
    }
};


// DELETE user
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.role === "admin") {
            return res.status(403).json({ success: false, message: "Cannot delete admin user" });
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete user error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// In your admin-user-controller.js
export const resetUserPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({ message: "Password required" });
        }

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// In your admin-user-controller.js
export const toggleBlockUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.isBlocked = !user.isBlocked;
        await user.save();

        res.status(200).json({
            message: user.isBlocked ? "User blocked" : "User unblocked",
            isBlocked: user.isBlocked,
            user,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
