import axiosInstance from "../api/axiosInstance";

export const registerUser = (formData) => axiosInstance.post("/auth/register", formData);
export const loginUser = (formData) => axiosInstance.post("/auth/login", formData);