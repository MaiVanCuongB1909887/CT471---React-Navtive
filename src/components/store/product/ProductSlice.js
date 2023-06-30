import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import productAPI from '../../services/productAPI';

export const getProduct = createAsyncThunk('product/getProduct', async data => {
  try {
    const response = await productAPI.getPerPage(data);
    if (!!response) {
      return response.product.items;
    }
  } catch (error) {
    console.log(error.response.data, 'day la loi productslice');
    throw console.log('chua lay duoc san pham');
  }
});

const ProductSlice = createSlice({
  name: 'product',
  initialState: {
    product: [],
    payload: [],
    isLoading: false,
    error: null,
  },
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = true;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default ProductSlice.reducer;
