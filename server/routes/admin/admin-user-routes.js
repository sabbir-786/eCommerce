import express from "express";
import {
    deleteUser, getAllUsers, updateUser, resetUserPassword,
    toggleBlockUser,
} from "../../controller/admin/admin-user-controller.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);
router.put("/users/:id/reset-password", resetUserPassword);
router.put("/users/:id/block-toggle", toggleBlockUser);


export default router;