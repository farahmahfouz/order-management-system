import axiosInstance from "./axiosInstance";

export const getOrders = async ({ page, limit, filter, sort }) => {
  const params = { page, limit };

  if (filter?.field && filter?.value) {
    params[filter.field] = filter.value;
  }

  if (sort) params.sort = sort;

  const response = await axiosInstance.get("/orders", { params });
  return response.data;
};

export const getOrder = async (id) => {
  const response = await axiosInstance.get(`/orders/${id}`);
  return response.data.data.order;
};

export const cancelOrder = async (id) => {
  const response = await axiosInstance.patch(`/orders/${id}/cancel`);
  return response;
};

export const completeOrder = async (id) => {
  const response = await axiosInstance.patch(`/orders/${id}/complete`);
  return response;
};

export const todayOrders = async () => {
  const response = await axiosInstance.get("/orders/sales");
  return response.data.data.orders;
};

export const createOrder = async ({ customerName, items }) => {
  const response = await axiosInstance.post("/orders", {
    customerName,
    items
  });

  console.log(response);

  return response.data.data.order;
};
