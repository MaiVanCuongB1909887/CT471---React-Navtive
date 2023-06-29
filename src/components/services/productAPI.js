import axiosClient from './axiosClient';

const productAPI = {
  getAllProduct() {
    const url = '/product/list1';
    return axiosClient.get(url);
  },
  getProduct(id) {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },
  search(data) {
    const url = `/product/list/name/${data}`;
    return axiosClient.get(url);
  },

  getPerPage(page) {
    const url = `/product/list?currentPage=${page}`;
    return axiosClient.get(url);
  },
};

export default productAPI;
