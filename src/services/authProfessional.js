import { apiClient } from "./config";

export const apiProfessionalSignUp = async (payload) => {
  return await apiClient.post(`/register`, payload);
};
export const apiProfessionalLogin = async (payload) => {
  return await apiClient.post("/login", payload);
};

export const apiGetProfessional = async (userId) => {
  return await apiClient.get(`/auth/${userId}`);
};

export const getProfessionals = async () => {
  return await apiClient.get(`/users`);
};

export const apiProfessionalLogout = async () => {
  return await apiClient.post("/logout");
};
