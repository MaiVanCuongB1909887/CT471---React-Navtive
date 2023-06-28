import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import userAPI from '../../components/services/userAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const updateUser = createAsyncThunk('user/updateUser', async data => {
  try {
    const response = await userAPI.update(data);
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error, 'day la loi khi lay update user');
  }
});
const UserSlice = createSlice({
  name: 'user',
  initialState: {
    userDetail: {},
    error: null,
  },
  reducers: {
    logoutU(state) {
      AsyncStorage.removeItem('userDetail');
      AsyncStorage.removeItem('adminDetail');
      state.userDetail = {};
      state.error = null;
    },
    setDetailUser(state, action) {
      state.userDetail = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userDetail = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.userDetail = {};
        state.error = action.error;
      });
  },
});
export const {logoutU, setDetailUser} = UserSlice.actions;
export default UserSlice.reducer;
