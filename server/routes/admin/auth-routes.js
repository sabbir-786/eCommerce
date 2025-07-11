import express from 'express';
import {
    adminLogin,
    adminLogout,
    adminAuthMiddleware,
} from '../../controllers/admin/auth-controller.js';

const router = express.Router();

router.post('/login', adminLogin);
router.post('/logout', adminLogout);

router.get("/check-auth", adminAuthMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export default router;
