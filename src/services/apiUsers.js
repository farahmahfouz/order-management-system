import axiosInstance from "./axiosInstance";

export async function getUsers({ page, limit, filter, sort }) {
  const params = { page, limit };

  if (filter?.field && filter?.value) {
    params[filter.field] = filter.value;
  }

  if (sort) params.sort = sort;

  const response = await axiosInstance.get("users", { params });
  return response.data;
}
