
import express from 'express';
import {
    handleImageUpload,
    addProduct,
    editProduct,
    fetchAllProducts,
    deleteProduct,
} from "./../../controller/admin/admin-products-controller.js";

import { upload } from "../../helper/cloudinary.js";

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchAllProducts);

export default router;
