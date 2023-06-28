import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productAPI from '../../components/services/productAPI';

export const searchByName = createAsyncThunk(
  'search/searchByName',
  async data => {
    try {
      const response = await productAPI.searchByName(data);
      if (!!response) {
        return response.product.items;
      }
    } catch (error) {
      console.log(error.response.data, 'day la loi searchByName');
      throw console.log('chua lay duoc san pham');
    }
  },
);
export const searchByCategory = createAsyncThunk(
  'search/searchByCategory',
  async id => {
    try {
      const response = await productAPI.searchByCategory(id);
      if (!!response) {
        return response;
      }
    } catch (error) {
      console.log(error.response.data, 'day la loi searchByCategory');
      throw console.log('chua lay duoc san pham');
    }
  },
);

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    products: [],
    keyword: null,
    isLoading: false,
    error: null,
  },
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(searchByName.fulfilled, (state, action) => {
        state.isLoading = true;
        state.products = action.payload.product.items;
        state.keyword = action.payload.data;
        state.error = null;
      })
      .addCase(searchByName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(searchByCategory.fulfilled, (state, action) => {
        state.isLoading = true;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(searchByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default SearchSlice.reducer;
