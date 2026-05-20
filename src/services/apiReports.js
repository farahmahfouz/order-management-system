// src/services/apiReports.js
import axiosInstance from "./axiosInstance";

export const getSalesReport = async ({ startDate, endDate, waiter }) => {
  const params = { startDate, endDate };
  if (waiter) params.waiter = waiter;

  const response = await axiosInstance.get("/reports/sales-report", { params });
  return response.data.data;
};

export const exportSalesReportCSV = async ({ startDate, endDate, waiter }) => {
  const params = { startDate, endDate, export: "true", format: "csv" };
  if (waiter) params.waiter = waiter;

  const response = await axiosInstance.get("/reports/sales-report", {
    params,
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "sales-report.csv");
  document.body.appendChild(link);
  link.click();
  link.remove();
};