import { configureStore } from "@reduxjs/toolkit";
import shopAuthReducer from './shopAuthSlice.js'
import commonFeatureSlice from './common.js'

import shopCartSlice from './shop-slice/cartSlice.js'
import shopProductsSlice from './shop-slice/productsSlice.js'
import shopAddressSlice from './shop-slice/addressSlice.js'
import shopOrderSlice from './shop-slice/orderSlice.js'
import shopSearchSlice from './shop-slice/searchSlice.js'
import shopReviewSlice from './shop-slice/reviewSlice.js'


const store = configureStore({
    reducer: {
        shopAuth: shopAuthReducer,


        shopProducts: shopProductsSlice,
        shopCart: shopCartSlice,
        shopAddress: shopAddressSlice,
        shopOrder: shopOrderSlice,
        shopSearch: shopSearchSlice,
        shopReview: shopReviewSlice,


        commonFeature: commonFeatureSlice,
    },
});

export default store;