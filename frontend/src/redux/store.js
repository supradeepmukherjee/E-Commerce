import { configureStore } from '@reduxjs/toolkit';
import cart from './api/cart';
import order from './api/order';
import product from './api/product';
import user from './api/user';
import authSlice from './reducers/auth';

const store = configureStore({
    reducer: {
        [cart.reducerPath]: cart.reducer,
        [order.reducerPath]: order.reducer,
        [product.reducerPath]: product.reducer,
        [user.reducerPath]: user.reducer,
        [authSlice.name]: authSlice.reducer,
    },
    middleware: d => d().concat([
        user.middleware,
        cart.middleware,
        order.middleware,
        product.middleware,
    ]),
    devTools: import.meta.env.NODE_ENV !== 'production',
})

export default store