import Order from "../../models/Order.js";
import Product from "../../models/Product.js";
import ProductReview from "../../models/Review.js";

export const addProductReview = async (req, res) => {
    try {
        const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

        const order = await Order.findOne({
            userId,
            "cartItems.productId": productId,
            // Optional: you could validate orderStatus if needed
            // orderStatus: { $in: ["confirmed", "delivered"] }
        });

        if (!order) {
            return res.status(403).json({
                success: false,
                message: "You need to purchase the product to review it.",
            });
        }

        const existingReview = await ProductReview.findOne({ productId, userId });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "You already reviewed this product!",
            });
        }

        const newReview = new ProductReview({
            productId,
            userId,
            userName,
            reviewMessage,
            reviewValue,
        });

        await newReview.save();

        const reviews = await ProductReview.find({ productId });
        const totalReviews = reviews.length;
        const averageReview =
            reviews.reduce((sum, review) => sum + review.reviewValue, 0) / totalReviews;

        await Product.findByIdAndUpdate(productId, { averageReview });

        res.status(201).json({
            success: true,
            data: newReview,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};

export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await ProductReview.find({ productId });

        res.status(200).json({
            success: true,
            data: reviews,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};