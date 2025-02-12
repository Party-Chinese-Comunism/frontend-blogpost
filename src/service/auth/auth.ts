import { AxiosRequestConfig } from "axios";
import { apiRequest } from "../../config/api";
import { SignInInput, SignUpInput } from "../../types/auth";

export const signIn = async (input: SignInInput): Promise<any> => {
  const config: AxiosRequestConfig = {
    url: "/api/auth/login",
    method: "POST",
    data: { input },
  };
  return apiRequest<any>(config);
};
export const signUp = async (input: SignUpInput): Promise<any> => {
  const config: AxiosRequestConfig = {
    url: "/api/auth/register",
    method: "POST",
    data: input,
  };
  return apiRequest<any>(config);
};
