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
  searchByName(data) {
    const url = `/product/list/name/${data}`;
    return axiosClient.get(url);
  },
  searchByCategory(id) {
    const url = `/product/list/category_id/${id}`;
    return axiosClient.get(url);
  },
  getPerPage(page) {
    const url = `/product/list?currentPage=${page}`;
    return axiosClient.get(url);
  },
};

export default productAPI;
