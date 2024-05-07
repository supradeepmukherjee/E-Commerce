import { configureStore } from '@reduxjs/toolkit';
import cart from './redux/api/cart';
import order from './redux/api/order';
import product from './redux/api/product';
import user from './redux/api/user';
import authSlice from './redux/reducers/auth';

const store = configureStore({
    reducer: {
        [cart.reducerPath]: cart.reducer,
        [order.reducerPath]: order.reducer,
        [product.reducerPath]: product.reducer,
        [user.reducerPath]: user.reducer,
        [authSlice.name]: authSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export default store