import axiosClient from './axiosClient';

const userAPI = {
  update(data) {
    const url = `/user/update`;
    return axiosClient.put(url, data);
  },
};

export default userAPI;
