import { apiClient } from "./config";

export const apiSignUp = async (payload) => {
  return await apiClient.post(`/register`, payload);
};

export const apiLogin = async (payload) => {
  return await apiClient.post("/login", payload);
};
export const generateToken = async (payload) => {
  return await apiClient.post("/auth/token", payload);
};

export const apiGetUser = async (userId) => {
  return await apiClient.get(`/auth/${userId}`);
};

export const getUsers = async () => {
  return await apiClient.get(`/users`);
};

export const apiLogout = async () => {
  return await apiClient.post("/logout");
};

// -------Professional--------
export const apiRegisterProfessional = async (payload) => {
  return await apiClient.post(`/register/professional`, payload);
}
export const apiLoginProfessional = async (payload) => {
  return await apiClient.post(`/register/professional`, payload);
}