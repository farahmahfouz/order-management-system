import axios from "axios";

// const API_URL = `http://localhost:3000/api/v1/`;
const API_URL = `https://order-management-system-apis--farahmmahfouz.replit.app/api/v1/`;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default axiosInstance;
