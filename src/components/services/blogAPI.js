import axiosClient from './axiosClient';

const blogAPI = {
  getAllBlog() {
    const url = '/blog/list';
    return axiosClient.get(url);
  },
  getBlog(id) {
    const url = `/blog/detail/${id}`;
    return axiosClient.get(url);
  },
  updateBlog(data) {
    const url = `blog/update`;
    return axiosClient.put(url, data);
  },
  deleteBlog(id) {
    const url = `blog/delete/${id}`;
    return axiosClient.delete(url);
  },
  addBlog(data) {
    const url = 'blog/create/';
    return axiosClient.post(url, data);
  },
};

export default blogAPI;
