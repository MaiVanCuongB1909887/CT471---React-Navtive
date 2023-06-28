import axiosClient from './axiosClient';

const cartAPI = {
  getCart() {
    const url = 'cart/list/';
    return axiosClient.get(url);
  },
  addCart(data) {
    const url = `cart/add/`;
    return axiosClient.post(url, data);
  },
  removeCart(id) {
    const url = `cart/delete/${id}`;
    return axiosClient.delete(url);
  },
  updatesCart(data) {
    const url = 'cart/change';
    return axiosClient.put(url, data);
  },
  address(data) {
    const url = 'cart/address';
    return axiosClient.post(url, data);
  },
  checkout(data) {
    const url = 'cart/check_out';
    return axiosClient.post(url, data);
  },
  getorder() {
    const url = 'order/list/';
    return axiosClient.get(url);
  },
};
export default cartAPI;
