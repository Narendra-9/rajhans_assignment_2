
import apiClient from "./apiClient"; 


export const deactivateUser = async (id) => {
  const response = await apiClient.put(`/admin/users/${id}/deactivate`);
  return response;
};

export const activateUser = async (id) => {
    const response = await apiClient.put(`/admin/users/${id}/activate`);
    return response;
  };

export const resetLock = async (id) => {
    const response = await apiClient.put(`/admin/users/${id}/resetLock`);
    return response;
  };