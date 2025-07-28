import axiosInstance from "./axiosInstance";

export const login = async (credientials) => {
  const response = await axiosInstance.post("/users/login", credientials);
  return response.data.data.user;
};

export const signup = async (credientials) => {
  const response = await axiosInstance.post("/users/register", credientials);
  return response.data.data.user;
};

export const getCurrentUser = async (credientials) => {
  const response = await axiosInstance.get("/users/me", credientials);
  return response.data.data.user;
};

export const logout = async () => {
  await axiosInstance.get("/users/logout");
};

export const updateUserDataForm = async ({ userId, updatedData }) => {
  const response = await axiosInstance.patch(`/users/${userId}`, updatedData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data.user;
};

export const updatePassword = async ({ passwordCurrent, password }) => {
  const response = await axiosInstance.patch("/users/updateMyPassword", {
    passwordCurrent,
    password,
  });
  return response.data.data.user;
};

export const forgotPassword = async ({ email }) => {
  const response = await axiosInstance.post("users/forgot-password", { email });
  return response;
};

