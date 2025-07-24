import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    user: String,
    comment: String,
    rating: Number,
}, { _id: false });

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: String,
        category: String,
        gender: {
            type: String,
            enum: ["Male", "Female", "Kid"],
            required: true,
        },
        brand: String,
        price: Number,
        discountPrice: Number,
        stock: Number,
        images: [String],
        rating: Number,
        reviews: [ReviewSchema],
        colors: [String],
        sizes: [String],
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
