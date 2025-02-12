import axios, { AxiosRequestConfig } from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: baseUrl,
});

export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
    try {
        const response = await api(config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};