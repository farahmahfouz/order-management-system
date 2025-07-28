import axiosInstance from "./axiosInstance";

export const getItems = async ({ page, limit, filter, sort }) => {
  const params = { page, limit };
  if (filter?.field && filter?.value) {
    params[filter.field] = filter.value;
  }
  if (sort) params.sort = sort;
  const response = await axiosInstance.get("items", { params });
  return response.data;
};

export const deleteItem = async (id) => {
  await axiosInstance.delete(`/items/${id}`);
};

export const createItem = async (data) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("price", data.price);
  formData.append("category", data.category);
  formData.append("expiryDate", data.expiryDate);
  formData.append("description", data.description);
  formData.append("stockQuantity", data.stockQuantity);

  formData.append("image", data.image);

  const response = await axiosInstance.post("items", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateItem = async (newItemData, id) => {
  const response = await axiosInstance.patch(`items/${id}`, newItemData);
  return response.data;
};

export const getOneItem = async (id) => {
  const response = await axiosInstance.get(`items/${id}`);
  return response.data.data.item;
};

export const handleDownload = async () => {
  const response = await axiosInstance.get("items/export", {
    responseType: "blob", 
  });

  const blob = new Blob([response.data], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "items.csv");
  document.body.appendChild(link);
  link.click();
  link.remove();
};


export const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosInstance.post("items/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("File uploaded successfully:", response.data);
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
