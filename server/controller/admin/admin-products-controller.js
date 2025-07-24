import { imageUploadUtil } from "../../helper/cloudinary.js";
import Product from "../../models/Product.js";

// Handle image upload
export const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);

        res.json({
            success: true,
            result,
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: "Error occurred",
        });
    }
};

export const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            gender,
            brand,
            price,
            discountPrice,
            stock,
            images,
            rating,
            reviews,
            colors,
            sizes,
        } = req.body;

        const newProduct = new Product({
            name,
            description,
            category,
            gender,
            brand,
            price,
            discountPrice,
            stock,
            images,      // Should be an array of strings (URLs)
            rating,      // Optional: average rating
            reviews,     // Optional: must match schema format
            colors,
            sizes,
        });

        await newProduct.save();

        res.status(201).json({
            success: true,
            data: newProduct,
        });
    } catch (error) {
        console.error("Error adding product:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to add product",
        });
    }
};


// Fetch all products
export const fetchAllProducts = async (req, res) => {
    try {
        const listOfProducts = await Product.find({});
        res.status(200).json({
            success: true,
            data: listOfProducts,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Error occurred",
        });
    }
};


export const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            description,
            category,
            gender,
            brand,
            price,
            discountPrice,
            stock,
            images,
            rating,
            reviews,
            colors,
            sizes,
        } = req.body;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Update only provided fields
        product.name = name || product.name;
        product.description = description || product.description;
        product.category = category || product.category;
        product.gender = gender || product.gender;
        product.brand = brand || product.brand;
        product.price = price === "" ? 0 : price ?? product.price;
        product.discountPrice = discountPrice === "" ? 0 : discountPrice ?? product.discountPrice;
        product.stock = stock ?? product.stock;
        product.images = images || product.images;
        product.rating = rating ?? product.rating;
        product.reviews = reviews || product.reviews;
        product.colors = colors || product.colors;
        product.sizes = sizes || product.sizes;

        await product.save();

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.error("Edit Product Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to update product",
        });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Error occurred",
        });
    }
};