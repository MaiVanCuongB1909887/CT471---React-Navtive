import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authAPI from '../../services/authAPI';

export const adminLogin = createAsyncThunk('user/adminLogin', async data => {
  try {
    const response = await authAPI.adminLogin(data);
    console.log(response, 'admin');
    if (!!response.token) {
      AsyncStorage.setItem('adminToken', response.token);
      return response;
    }
  } catch (error) {
    throw console.log(error.response.data.message, 'day la loi admin');
  }
});

export const userLogin = createAsyncThunk('user/userLogin', async data => {
  try {
    const response = await authAPI.userLogin(data);
    if (!!response.token) {
      // console.log(response, 'day la respone userLogin');
      AsyncStorage.setItem(
        'userDetail',
        JSON.stringify(response.customer_info),
      );
    await  AsyncStorage.setItem('userToken', response.token);
      return response.token;
    }
  } catch (error) {
    throw console.log(error.response.data.message, 'day la loi user');
  }
});

const AuthSlice = createSlice({
  name: 'user',
  initialState: {
    userToken: AsyncStorage.getItem('userToken')._j || null,
    adminToken: null,
    error: null,
  },
  reducers: {
    logout(state) {
      AsyncStorage.removeItem('userToken');
      AsyncStorage.removeItem('adminToken');
      AsyncStorage.removeItem('userDetail');
      AsyncStorage.removeItem('adminDetail');
      state.userToken = null;
      state.adminToken = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.userToken = action.payload;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.userToken = null;
        state.error = action.error.message;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.adminToken = action.payload;
        state.error = null;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.adminToken = null;
        state.error = action.error.message;
      });
  },
});
export const {logout} = AuthSlice.actions;
export default AuthSlice.reducer;
