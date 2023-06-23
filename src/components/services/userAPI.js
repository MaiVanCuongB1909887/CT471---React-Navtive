import axiosClient from './axiosClient';

const userAPI = {
  getDetail() {
    const url = '/user/detail';
    return axiosClient.get(url);
  },
  getAll(params) {
    const url = '/user/all';
    return axiosClient.get(url, {params}); // chỉ định thêm object config
  },
  get(id) {
    const url = `/user/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/user/create';
    return axiosClient.post(url, data); // post(url,data,objectconfig)
  },
  update(data) {
    const url = `/user/update`;
    return axiosClient.patch(url, data); // or push
  },
  remove(data) {
    const url = `/user/delete/${data}`;
    return axiosClient.delete(url);
  },
};

export default userAPI;
