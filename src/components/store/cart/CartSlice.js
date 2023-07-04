import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cartAPI from '../../services/cartAPI';

export const getCart = createAsyncThunk('cart/getCart', async () => {
  try {
    const response = await cartAPI.getCart();
    if (!!response) {
      return response.product_in_cart;
    }
  } catch (error) {
    console.log(error.response.data.message, 'day la loi luc lay cart');
  }
});

export const addToCart = createAsyncThunk('cart/addToCart', async data => {
  try {
    await cartAPI.addCart(data);
    const response = await cartAPI.getCart();
    if (!!response) {
      alert('Them gio hang thanh cong');
      return response.product_in_cart;
    }
  } catch (error) {
    throw console.log(error.response.data.message, 'day la loi luc them cart');
  }
});
export const changeQtyCart = createAsyncThunk(
  'cart/changeQtyCart',
  async data => {
    try {
      await cartAPI.updatesCart(data);
      const response = await cartAPI.getCart();
      if (!!response) {
        return response.product_in_cart;
      }
    } catch (error) {
      throw console.log(error, 'day la loi luc them so luong');
    }
  },
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async data => {
    try {
      await cartAPI.removeCart(data);
      const response = await cartAPI.getCart();
      if (!!response) {
        alert('Xoa san pham thanh cong');
        return response.product_in_cart;
      }
    } catch (error) {
      throw console.log(error, 'day la loi luc xoa cart');
    }
  },
);
export const address = createAsyncThunk('cart/address', async data => {
  try {
    await cartAPI.address(data);
    const response = await cartAPI.getCart();
    if (!!response) {
      return response.product_in_cart;
    }
  } catch (error) {
    throw console.log(error, 'day la loi luc fetch dia chi');
  }
});
export const checkout = createAsyncThunk('cart/checkout', async data => {
  try {
    const response = await cartAPI.checkout(data);
    if (!!response) {
      alert('Thanh toan thanh cong');
      return response;
    }
  } catch (error) {
    throw console.log(error, 'day la loi luc thanh toan');
  }
});
export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    isLoading: false,
    error: null,
    order: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isLoading = true;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.cart = [];
        state.error = action.error;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isLoading = true;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.error;
      })
      .addCase(changeQtyCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isLoading = true;
      })
      .addCase(changeQtyCart.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.error;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isLoading = true;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(address.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.err = null;
      })
      .addCase(address.rejected, (state, action) => {
        state.err = action.error;
      })
      .addCase(checkout.fulfilled, state => {
        state.cart = [];
        state.order = true;
        state.err = null;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.err = action.error;
      });
  },
});

export default CartSlice.reducer;
