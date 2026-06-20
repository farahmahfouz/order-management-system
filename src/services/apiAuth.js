import axiosInstance from "./axiosInstance";

export const login = async (credientials) => {
  const response = await axiosInstance.post("/users/login", credientials);
  return response.data.data.user;
};

export const signup = async (credientials) => {
  const response = await axiosInstance.post("/users/register", credientials);
  return response.data.data.user;
};

export async function getCurrentUser() {
  try {
    const { data } = await axiosInstance.get("/users/me");

    return data.data.user;
  } catch (err) {
    if (err.response?.status === 401) {
      return null;
    }

    throw err;
  }
}

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

export const forgotPassword = async (data) => {
  const response = await axiosInstance.post("/users/forgot-password", data);
  return response.data;
};

export const resetPassword = async ({ token, password }) => {
  const response = await axiosInstance.patch(`/users/reset-password/${token}`, {
    password,
  });
  return response.data;
};
