import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import axios from 'axios';

const checkToken = async () => {
  switch (
    (await AsyncStorage.getItem('userToken')) ||
    (await AsyncStorage.getItem('adminToken'))
  ) {
    case await AsyncStorage.getItem('userToken'):
      return await AsyncStorage.getItem('userToken');
    case await AsyncStorage.getItem('adminToken'):
      return await AsyncStorage.getItem('adminToken');
    default:
      return null;
  }
  // if (await AsyncStorage.getItem('userToken')) {
  //   return await AsyncStorage.getItem('userToken');
  // }
  // if (await AsyncStorage.getItem('adminToken')) {
  //   return await AsyncStorage.getItem('adminToken');
  // } else return null;
};

const axiosClient = axios.create({
  baseURL: 'http://192.168.1.9:5000/',
});

axiosClient.interceptors.request.use(
  async config => {
    const token = await checkToken();
    if (!!token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    } else {
      config.headers = {
        'Content-Type': 'application/json',
      };
    }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosClient;
