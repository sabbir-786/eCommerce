import paypal from "../../helper/paypal.js";
import Order from "../../models/Order.js";
import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";

// 1. Create PayPal Payment + Save Order with pending status
export const createOrder = async (req, res) => {
    try {
        const {
            userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
            cartId,
        } = req.body;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }

        const create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal",
            },
            redirect_urls: {
                return_url: "http://localhost:5173/shop/paypal-return",
                cancel_url: "http://localhost:5173/shop/paypal-cancel",
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map((item) => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: "USD",
                            quantity: item.quantity,
                        })),
                    },
                    amount: {
                        currency: "USD",
                        total: totalAmount.toFixed(2),
                    },
                    description: "Checkout from React Shop",
                },
            ],
        };

        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                console.error("PayPal error:", error.response || error);
                return res.status(500).json({
                    success: false,
                    message: "Error while creating PayPal payment",
                });
            } else {
                const newlyCreatedOrder = new Order({
                    userId,
                    cartId,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderDate,
                    orderUpdateDate,
                    paymentId,
                    payerId,
                });

                await newlyCreatedOrder.save();

                const approvalURL = paymentInfo.links.find(
                    (link) => link.rel === "approval_url"
                )?.href;

                res.status(201).json({
                    success: true,
                    approvalURL,
                    orderId: newlyCreatedOrder._id,
                });
            }
        });
    } catch (e) {
        console.error("Server error in createOrder:", e);
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
        });
    }
};

// 2. Capture PayPal Payment after user returns
export const capturePayment = async (req, res) => {
    try {
        const { paymentId, payerId, orderId } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        order.paymentStatus = "paid";
        order.orderStatus = "confirmed";
        order.paymentId = paymentId;
        order.payerId = payerId;

        for (const item of order.cartItems) {
            const product = await Product.findById(item.productId);
            if (!product || product.totalStock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Not enough stock for product: ${item.title}`,
                });
            }

            product.totalStock -= item.quantity;
            await product.save();
        }

        await Cart.findByIdAndDelete(order.cartId);
        await order.save();

        res.status(200).json({
            success: true,
            message: "Order confirmed",
            data: order,
        });
    } catch (e) {
        console.error("Server error in capturePayment:", e);
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
        });
    }
};

// 3. Get all orders by user
export const getAllOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId });

        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: "No orders found",
            });
        }

        res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (e) {
        console.error("Server error in getAllOrdersByUser:", e);
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
        });
    }
};

// 4. Get details of a single order
export const getOrderDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (e) {
        console.error("Server error in getOrderDetails:", e);
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
        });
    }
};
