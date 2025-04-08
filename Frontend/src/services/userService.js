import { URLCONSTANTS } from "../constants/urlConstants";
import apiClient from "./apiClient"; 


export const getUsers = async () => {
  const response = await apiClient.get(URLCONSTANTS.USERS);
  return response;
};

export const searchUsers = async (keyword,page,size) => {
  const queryParams = new URLSearchParams();
  
  if (keyword) queryParams.append("keyword", keyword);
  if (page) queryParams.append("page", page);
  if (size) queryParams.append("size", size);

  const response = await apiClient.get(`${URLCONSTANTS.SEARCH_USERS}?${queryParams.toString()}`);
  return response;
};

export const getUserById = async (id) => {
  const response = await apiClient.get(`${URLCONSTANTS.USERS}/${id}`);
  return response;
};

export const registerUser = async (userRegisterDto) => {
  const response = await apiClient.post(`${URLCONSTANTS.USER_REGISTER}`,userRegisterDto);
  return response;
};

export const loginUser = async (userLoginDto) => {
  const response = await apiClient.post(`${URLCONSTANTS.USER_LOGIN}`,userLoginDto);
  return response;
};

export const forgotPassword = async (email) => {
  const response = await apiClient.put(`${URLCONSTANTS.FORGOT_PASSWORD}?email=${email}`);
  return response;
};

export const validateToken = async (token) => {
  const response = await apiClient.get(`${URLCONSTANTS.VALIDATE_TOKEN}?token=${token}`);
  return response;
};

export const setNewPassword = async (newPasswordRequestDto) => {
  const response = await apiClient.put(`${URLCONSTANTS.SET_NEW_PASSWORD}`,newPasswordRequestDto);
  return response;
};

export const updateUser = async (userUpdateDto) => {
  const response = await apiClient.put(`${URLCONSTANTS.USER_UPDATE}`,userUpdateDto);
  return response;
};


export const resetPassword = async (UserPasswordResetDto) => {
  const response = await apiClient.put(`${URLCONSTANTS.PASSWORD_RESET}`,UserPasswordResetDto);
  return response;
};

export const deactivateUser = async (deactivateUserDto) => {
  const response = await apiClient.put(`${URLCONSTANTS.DEACTIVATE}`,deactivateUserDto);
  return response;
};


