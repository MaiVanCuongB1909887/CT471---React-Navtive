import AsyncStorage from '@react-native-async-storage/async-storage';
import {login, logout} from '../action';
import userAPI from '../../src/services/userAPI';

export const loginThunk = (email, password) => async dispatch => {
  try {
    const response = await userAPI.postLogin({
      email: email,
      password: password,
    });
    if (!!response) {
      const token = response.token;
      await AsyncStorage.setItem('sessionToken', token);
      await AsyncStorage.setItem(
        'user',
        JSON.stringify(response.customer_info),
      );
      dispatch(login(token));
    }
  } catch (error) {
    return alert(error.response.data.message);
  }
};

export const logoutThunk = () => async dispatch => {
  try {
    await AsyncStorage.removeItem('sessionToken');
    await AsyncStorage.removeItem('user');
    dispatch(logout());
  } catch (error) {
    return alert(error);
  }
};
