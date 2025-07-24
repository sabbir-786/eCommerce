import Category from "../../models/Category.js";
import Brand from "../../models/Brand.js";


// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch categories" });
    }
};

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: "Failed to create category" });
    }
};

// Delete a category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        res.status(200).json({ message: "Category deleted", id });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete category" });
    }
};



// Get all categories
export const getAllBrand = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch categories" });
    }
};

// Create a new category
export const createBrand = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: "Failed to create category" });
    }
};

// Delete a category
export const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        res.status(200).json({ message: "Category deleted", id });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete category" });
    }
};
