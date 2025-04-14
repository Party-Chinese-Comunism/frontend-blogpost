import { AxiosRequestConfig } from "axios";
import { apiRequestWithOptionalToken, apiRequestWithoutToken, apiRequestWithToken } from "../../config/api";
import { CreatePostInput, ListMyPostsResponse } from "../../types/posts";
import { Comment } from "../../types/posts";

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
    url: "/posts/create",
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
    url: "/posts/my-posts",
    method: "GET",
  };

  return apiRequestWithToken<ListMyPostsResponse>(config);
};

export const getAllPosts = async (): Promise<ListMyPostsResponse> => {
  const config: AxiosRequestConfig = {
    url: "/posts/list",
    method: "GET",
  };

  return apiRequestWithOptionalToken<ListMyPostsResponse>(config);
};

type CreateComment = {
  postId: number;
  content: string;
};

export const createComment = async (input: CreateComment): Promise<any> => {
  const config: AxiosRequestConfig = {
    url: `/comments/create`,
    method: "POST",
    data: { content: input.content, post_id: input.postId },
    headers: {
      "Content-Type": "application/json",
    },
  };

  return apiRequestWithToken<any>(config);
};

type LikeCommentInput = {
  commentId: number;
};
type GetCommentsInput = {
  postId: number;
};

export const getCommentsByPostId = async ({ postId }: GetCommentsInput): Promise<Comment[]> => {
  const config: AxiosRequestConfig = {
    url: `/comments/list/${postId}`,
    method: "GET",
  };

    const response = await apiRequestWithOptionalToken<Comment[]>(config); 
    return response;};


export const likeComment = async (input: LikeCommentInput): Promise<any> => {
  const config: AxiosRequestConfig = {
    url: `/user/like/${input.commentId}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return apiRequestWithToken<any>(config);
};

type FavoritePostInput = {
  postId: number;
};

export const favoritePost = async (input: FavoritePostInput): Promise<any> => {
  const config: AxiosRequestConfig = {
    url: `/user/favorite/${input.postId}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return apiRequestWithToken<any>(config);
};


export const getFavoritePosts = async (): Promise<ListMyPostsResponse> => {
  const config: AxiosRequestConfig = {
    url: "/user/favorites",
    method: "GET",
  };

  return apiRequestWithToken<ListMyPostsResponse>(config);
};

export const getUserPosts = async (userId: string): Promise<ListMyPostsResponse> => {
  const config: AxiosRequestConfig = {
    url: `/posts/${userId}`,
    method: "GET",
  };

  return apiRequestWithToken<ListMyPostsResponse>(config);
};
