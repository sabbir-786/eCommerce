import paypal from "paypal-rest-sdk";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

paypal.configure({
    mode: process.env.PAYPAL_MODE, // 'sandbox' or 'live'
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

export default paypal;