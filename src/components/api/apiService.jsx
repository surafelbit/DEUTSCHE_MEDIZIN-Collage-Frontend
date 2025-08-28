import apiClient from "./apiClient";
const apiService = {
  get: async (url, params = {}) => {
    const response = await apiClient.get(url, params);
    return response.data;
  },
  post: async (url, data) => {
    const response = await apiClient.post(url, data);
    return response.data;
  },
  put: async (url, data) => {
    const response = await apiClient.put(url, data);
    return response.data;
  },
  delete: async (url) => {
    const response = await apiClient.delete(url);
    return response.data;
  },
};
export default apiService;
