import { AxiosRequestConfig } from "axios";
import { apiRequestWithoutToken, apiRequestWithToken } from "../../config/api";
import { CreatePostInput, ListMyPostsResponse } from "../../types/posts";

export const createPost = async (input: CreatePostInput): Promise<any> => {
  const formData = new FormData();
  if (input.title) {
    formData.append("title", input.title);
  }
  if (input.description) {
    formData.append("description", input.description);
  }
  if (input.image) {
    formData.append("image", input.image[0]);
  }
  const config: AxiosRequestConfig = {
    url: "/api/posts/create",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return apiRequestWithToken<any>(config);
};
export const listMyPosts = async (): Promise<ListMyPostsResponse> => {
  const config: AxiosRequestConfig = {
    url: "/api/posts/my-posts",
    method: "GET",
  };

  return apiRequestWithToken<ListMyPostsResponse>(config);
};

export const getAllPosts = async (): Promise<ListMyPostsResponse> => {
  const config: AxiosRequestConfig = {
    url: "/api/posts/list",
    method: "GET",
  };

  return apiRequestWithoutToken<ListMyPostsResponse>(config);
};

type CreateComment = {
  postId: number;
  content: string;
};

export const createComment = async (input: CreateComment): Promise<any> => {
  const config: AxiosRequestConfig = {
    url: `/api/comments/create`,
    method: "POST",
    data: { content: input.content, post_id: input.postId },
    headers: {
      "Content-Type": "application/json",
    },
  };

  return apiRequestWithToken<any>(config);
};
