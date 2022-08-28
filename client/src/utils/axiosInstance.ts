import axios from "axios";

const axiosInstance = axios.create({ withCredentials: true });

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (config.headers) {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  }
  return config;
});

export default axiosInstance;
