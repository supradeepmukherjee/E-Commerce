import { configureStore } from '@reduxjs/toolkit'
import { cartItemsReducer, cartReducer } from './Reducers/Cart'; 
import { orderReducer } from './Reducers/Order';
import { productDetailsReducer, productReducer, reviewReducer } from "./Reducers/Product";
import { passwordReducer, shipReducer, updateMyProfileReducer, userProfileReducer, userReducer } from './Reducers/User';

const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailsReducer,
        user: userReducer,
        userProfile: userProfileReducer,
        updateMyProfile: updateMyProfileReducer,
        password: passwordReducer,
        cart: cartReducer,
        cartItems: cartItemsReducer,
        ship: shipReducer,
        order: orderReducer,
        review: reviewReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export default store