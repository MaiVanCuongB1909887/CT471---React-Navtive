import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authAPI from '../../services/authAPI';

export const adminLogin = createAsyncThunk('user/adminLogin', async data => {
  try {
    const response = await authAPI.adminLogin(data);
    console.log(response, 'admin');
    if (!!response.token) {
      const adminToken = response.token;
      AsyncStorage.setItem('adminToken', adminToken);
      return response;
    }
  } catch (error) {
    throw console.log(error.response.data.message, 'day la loi admin');
  }
});

export const userLogin = createAsyncThunk('user/userLogin', async data => {
  try {
    const response = await authAPI.userLogin(data);
    console.log(response, 'user');
    if (!!response.token) {
      const userToken = response.token;
      AsyncStorage.setItem('userToken', userToken);
      return response;
    }
  } catch (error) {
    console.log(error);
    throw console.log(error.response.data.message, 'day la loi user');
  }
});
const AuthSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    userToken: null,
    adminToken: null,
    error: null,
  },
  reducers: {
    logout: state => {
      AsyncStorage.removeItem('userToken');
      AsyncStorage.removeItem('adminToken');
      state.userToken = null;
      state.adminToken = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.userToken = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.userToken = null;
        state.error = action.error.message;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.adminToken = action.payload;
        state.isLoggedIn = true;
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
