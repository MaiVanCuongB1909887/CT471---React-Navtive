import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authAPI from '../../services/authAPI';
import {setDetailUser} from '../user/UserSlice';

export const adminLogin = createAsyncThunk('auth/adminLogin', async data => {
  try {
    const response = await authAPI.adminLogin(data);
    if (!!response.token) {
      console.log('Da lay duoc token Admin');
      AsyncStorage.setItem('adminToken', response.token);
      return response.token;
    }
  } catch (error) {
    throw console.log(error.response.data.message, 'day la loi admin');
  }
});

export const userLogin = createAsyncThunk('auth/userLogin', async data => {
  try {
    const response = await authAPI.userLogin(data);
    if (!!response.token) {
      console.log('Da lay duoc token User');
      await AsyncStorage.setItem(
        'userDetail',
        JSON.stringify(response.customer_info),
      );
      await AsyncStorage.setItem('userToken', response.token);
      return response;
    }
  } catch (error) {
    throw console.log(error.response.data.message, 'day la loi user');
  }
});

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async () => {
    try {
      await AsyncStorage.getItem('userToken').then(token => {
        if (!!token) {
          dispatch(setUser(token));
        }
      });
      await AsyncStorage.getItem('userDetail').then(detail => {
        if (!!detail) {
          dispatch(setDetailUser(detail));
        }
      });
    } catch (error) {
      console.log('Loi khi co lay token tu local', error);
    }
  },
);
export const userRegister = createAsyncThunk(async data => {
  try {
    const response = await authAPI.userRegister(data);
    if (!!response) {
      return response;
    }
  } catch (error) {
    throw console.log(error);
  }
});

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    userToken: null,
    adminToken: null,
    isLoggedIn: false,
    isAdmin: false,
    error: null,
  },
  reducers: {
    logoutA(state) {
      AsyncStorage.removeItem('userToken');
      AsyncStorage.removeItem('adminToken');
      state.userToken = null;
      state.adminToken = null;
      state.isLoggedIn = false;
      state.isAdmin = false;
    },
    setUser(state, action) {
      state.userToken = action.payload;
      state.isLoggedIn = true;
    },
    setAdmin(state, action) {
      state.adminToken = action.payload;
      state.isLoggedIn = true;
      state.isAdmin = true;
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
        state.isAdmin = true;
        state.error = null;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.adminToken = null;
        state.error = action.error.message;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.userToken = null;
        state.error = action.error.message;
      });
  },
});
export const {logoutA, setAdmin, setUser} = AuthSlice.actions;
export default AuthSlice.reducer;
