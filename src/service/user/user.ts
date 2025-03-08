import { AxiosRequestConfig } from "axios";
import { apiRequestWithOptionalToken, apiRequestWithToken } from "../../config/api";

type GetUserByIdResponse = {
  user_image: string;
  username: string;
  followers_number: number;
  following_number: number;
};

export interface UserResponse {
  user_image: string;
  username: string;
  followers_number: number;
  following_number: number;
}

export const getUserById = async (userId: string): Promise<UserResponse> => {
  const config: AxiosRequestConfig = {
    url: `/api/get-user-by-id/${userId}`,
    method: "GET",
  };

  return apiRequestWithToken<UserResponse>(config);
};
