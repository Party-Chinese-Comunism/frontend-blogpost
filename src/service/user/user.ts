import { AxiosRequestConfig } from "axios";
import { api, apiRequestWithOptionalToken } from "../../config/api";

type GetUserByIdResponse = {
  user_image: string;
  username: string;
  followers_number: number;
  following_number: number;
};

export const followUser = async (userId: string) => {
  const response = await api.post(`/user/follow/${userId}`);
  return response.data;
};

export const unfollowUser = async (userId: string) => {
  const response = await api.post(`/user/unfollow/${userId}`);
  return response.data;
};

export const getUserById = async (userId: number): Promise<GetUserByIdResponse> => {
  const config: AxiosRequestConfig = {
    url: `/get-user-by-id/${userId}`,
    method: "GET",
  };

  return apiRequestWithOptionalToken<GetUserByIdResponse>(config);
};
