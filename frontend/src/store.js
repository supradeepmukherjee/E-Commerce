import { configureStore } from '@reduxjs/toolkit';
import cart from './redux/api/cart';
import order from './redux/api/order';
import product from './redux/api/product';
import user from './redux/api/user';
import alertSlice from './redux/reducers/alert';
import authSlice from './redux/reducers/auth';

const store = configureStore({
    reducer: {
        [cart.reducerPath]: cart.reducer,
        [order.reducerPath]: order.reducer,
        [product.reducerPath]: product.reducer,
        [user.reducerPath]: user.reducer,
        [authSlice.name]: authSlice.reducer,
        [alertSlice.name]: alertSlice.reducer,
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