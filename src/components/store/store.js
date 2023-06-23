import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './auth/AuthSlice';
import cartReducer from './cart/CartSlice';
import productReducer from './product/ProductSlice';

const rootReducer = combineReducers({
  user: authReducer,
  cart: cartReducer,
  product: productReducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
