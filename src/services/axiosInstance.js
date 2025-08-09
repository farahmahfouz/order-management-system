import axios from "axios";
import Cookies from "js-cookie";

// const API_URL = `http://localhost:3000/api/v1/`;
const API_URL = `https://order-management-system-apis-production.up.railway.app/api/v1/`;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("jwt");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
