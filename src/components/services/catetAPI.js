import axiosClient from './axiosClient';

const cateAPI = {
  getAllCate() {
    const url = '/category/list';
    return axiosClient.get(url);
  },
};
export default cateAPI;
