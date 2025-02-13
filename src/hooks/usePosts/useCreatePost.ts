import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../service/posts/posts";

export const useCreatePost = () => {
  return useMutation({
    mutationKey: ["useCreatePost"],
    mutationFn: createPost,
  });
};
