import axiosInstance from "./axiosInstance";

export const getGoogleStatus = async () => {
  const response = await axiosInstance.get("/google/status");
  return response.data;
};

export const connectGoogle = () => {
  window.location.href = "http://localhost:3000/api/v1/auth/google";
};