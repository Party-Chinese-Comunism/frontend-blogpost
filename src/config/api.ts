import axios, { AxiosRequestConfig } from "axios";
import { getDecryptedToken } from "../utils/encryption";

const baseUrl = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: baseUrl,
});

export const apiRequestWithToken = async <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  const token = getDecryptedToken();
  if (!token) {
    throw new Error("Token not found");
  }

  const configWithAuth: AxiosRequestConfig = {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await api(configWithAuth);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.error("Token expired");
        localStorage.removeItem("token");
        throw new Error("Token expired");
      }
      console.error("Request with token failed:", error.message);
      throw error;
    } else {
      console.error("An unexpected error occurred:", error);
      throw error;
    }
  }
};

export const apiRequestWithoutToken = async <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api(config);
    return response.data;
  } catch (error) {
    console.error("Request without token failed:", error);
    throw error;
  }
};
