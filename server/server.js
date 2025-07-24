import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

dotenv.config();

//admin Routes
import adminAuthRouter from './routes/admin/admin-auth-routes.js';
import adminUserRouter from './routes/admin/admin-user-routes.js';
import adminOrderRouter from './routes/admin/admin-order-routes.js'
import adminProductsRouter from './routes/admin/admin-products-routes.js';
import adminCategoryRoutes from './routes/admin/admin-category-routes.js'

// Shop Routes
import authShopRouter from './routes/shop/shop-auth-routes.js'
import shopProductsRouter from './routes/shop/shop-products-routes.js';
import shopCartRouter from "./routes/shop/shop-cart-routes.js";
import shopAddressRouter from "./routes/shop/shop-address-routes.js";
import shopOrderRouter from "./routes/shop/shop-order-routes.js";
import shopSearchRouter from "./routes/shop/shop-search-routes.js";
import shopReviewRouter from "./routes/shop/shop-review-routes.js";




//comman Routes
import commonFeatureRouter from './routes/common-feature-routes.js'


connectDB();

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4000'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
        "Content-Type",
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],
    credentials: true,
}));


app.use(express.json());
app.use(cookieParser());


//Admin API
app.use("/api/admin/auth", adminAuthRouter);
app.use("/api/admin", adminUserRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/admin", adminCategoryRoutes);



//Shop API 
app.use("/api/shop/auth", authShopRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

//comman API
app.use("/api/common/feature", commonFeatureRouter);








const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server started at http://localhost:${PORT}`);
});