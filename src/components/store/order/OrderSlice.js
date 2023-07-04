import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import cartAPI from '../../services/cartAPI';

export const getOrder = createAsyncThunk('order/getOrder', async () => {
  try {
    const response = await cartAPI.getorder();
    if (!!response) {
      return response.orders;
    }
  } catch (error) {
    console.log(error.response.data, 'day la loi lay order');
  }
});

const OrderSlice = createSlice({
  name: 'order',
  initialState: {
    order: [],
    isLoading: false,
    error: null,
  },
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = true;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default OrderSlice.reducer;
