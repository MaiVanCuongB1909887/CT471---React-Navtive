import axiosClient from './axiosClient';

const authAPI = {
  userRegister(data) {
    const url = '/account/register';
    return axiosClient.post(url, data);
  },
  userLogin(data) {
    const url = '/account/login';
    return axiosClient.post(url, data);
  },
  adminLogin(data) {
    const url = '/account/admin/login';
    return axiosClient.post(url, data);
  },
};
export default authAPI;
