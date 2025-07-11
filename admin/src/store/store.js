import { configureStore } from "@reduxjs/toolkit";

import adminAuthReducer from './adminAuthSlice';
import commanFeatureSlice from './featureSlice';
import adminProductsSlice from './productSlice';
import adminOrderSlice from './orderSlice';
import adminFeatureSlice from './featureSlice'; // ✅ optional if features managed in admin

const adminStore = configureStore({
    reducer: {
        adminAuth: adminAuthReducer,
        adminProducts: adminProductsSlice,
        adminOrder: adminOrderSlice,
        adminFeature: adminFeatureSlice,
        commanFeature: commanFeatureSlice,
    },
});

export default adminStore;
