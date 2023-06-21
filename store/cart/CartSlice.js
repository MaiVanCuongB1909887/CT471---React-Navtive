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
    throw console.log(error.message, 'day la loi luc lay cart');
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
    throw console.log(error.message, 'day la loi luc them cart');
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
// export const checkout = createAsyncThunk('cart/checkout', async data => {
//   try {
//     const response = await cartAPI.getCart();
//     const res = await cartAPI.checkout(response);
//   } catch (error) {
//     console.log(error, 'day la loi cartslice');
//   }
// });
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isLoading = true;
      })
      .addCase(getCart.rejected, (state, action) => {
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
      });
  },
});

export default cartSlice.reducer;
