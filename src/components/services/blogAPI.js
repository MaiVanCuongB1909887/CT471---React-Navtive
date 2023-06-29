import axiosClient from './axiosClient';

const blogAPI = {
  getAllBlog() {
    const url = '/blog/list1';
    return axiosClient.get(url);
  },
  getBlog(id) {
    const url = `/blog/${id}`;
    return axiosClient.get(url);
  },
  updateBlog(data) {
    const url = `/blog/update/${data}`;
    return axiosClient.put(url, data);
  },
  deleteBlog(id) {
    const url = `/blog/delete/${id}`;
    return axiosClient.post(url, id);
  },
  addBlog(data) {
    const url = `/blog/add/${data}`;
    return axiosClient.post(url, data);
  },
};

export default blogAPI;
