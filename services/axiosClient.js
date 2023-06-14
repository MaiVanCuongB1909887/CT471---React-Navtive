import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const getUserToken = async () => {
  token = await AsyncStorage.getItem('sessionToken');
  return token;
};

const axiosClient = axios.create({
  baseURL: 'http://192.168.1.9:5000',
});

axiosClient.interceptors.request.use(
  async config => {
    const token = await getUserToken();
    // console.log(token);
    if (token) {
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
