import { apiClient } from "./config";

export const apiBookConsultation = async (payload) => {
  return await apiClient.post(`/book-consultation`, payload);
};
