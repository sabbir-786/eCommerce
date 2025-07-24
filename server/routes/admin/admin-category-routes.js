import express from "express";
import {
    getAllCategories,
    createCategory,
    deleteCategory,
    getAllBrand,
    createBrand,
    deleteBrand,
} from "../../controller/admin/admin-category-controller.js";

const router = express.Router();

router.get("/categories", getAllCategories);
router.post("/categories", createCategory);
router.delete("/categories/:id", deleteCategory);
router.get("/brand", getAllBrand);
router.post("/brand", createBrand);
router.delete("/brand/:id", deleteBrand);

export default router;
