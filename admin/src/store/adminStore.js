import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from './adminAuthSlice.js'
import adminUserReducer from './adminUserSlice.js'

import adminFeatureSlice from './adminFeatureSlice.js';
import adminProductsSlice from './adminProductSlice.js';
import adminOrderSlice from './adminOrderSlice.js';
import categorySlice from "./categorySlice";

const store = configureStore({
    reducer: {
        adminAuth: adminAuthReducer,
        adminUsers: adminUserReducer,
        adminProducts: adminProductsSlice,
        adminOrder: adminOrderSlice,
        adminFeature: adminFeatureSlice,
        category: categorySlice,
    },
});

export default store;