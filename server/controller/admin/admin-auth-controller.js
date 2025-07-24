import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY;

// Admin Login
export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || user.role !== 'admin') {
            return res.json({
                success: false,
                message: 'Unauthorized: Not an admin',
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: 'Incorrect credentials',
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
                userName: user.userName,
            },
            ADMIN_SECRET,
            { expiresIn: '60m' }
        );

        res.cookie('adminToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        }).json({
            success: true,
            message: 'Admin login successful',
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                userName: user.userName,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Admin Logout
export const adminLogout = (req, res) => {
    res.clearCookie('adminToken').json({
        success: true,
        message: 'Admin logged out successfully',
    });
};

// Admin Middleware
export const adminAuthMiddleware = (req, res, next) => {
    const token = req.cookies.adminToken;

    if (!token)
        return res.status(401).json({
            success: false,
            message: 'No admin token found',
        });

    try {
        const decoded = jwt.verify(token, ADMIN_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied: Not an admin',
            });
        }

        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
        });
    }
};