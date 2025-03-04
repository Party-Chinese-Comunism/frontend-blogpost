import { AxiosRequestConfig } from "axios";
import { apiRequestWithOptionalToken } from "../../config/api";

type GetUserByIdResponse = {
  user_image: string;
  username: string;
  followers_number: number;
  following_number: number;
};

export const getUserById = async (userId: number): Promise<GetUserByIdResponse> => {
  const config: AxiosRequestConfig = {
    url: `/get-user-by-id/${userId}`,
    method: "GET",
  };

  return apiRequestWithOptionalToken<GetUserByIdResponse>(config);
};
