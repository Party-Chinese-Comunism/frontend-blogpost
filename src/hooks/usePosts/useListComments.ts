import { useQuery } from "@tanstack/react-query";
import { getCommentsByPostId } from "../../service/posts/posts";


export const useListComments = (postId: number | null) => {
  return useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      if (!postId) return [];
      return getCommentsByPostId({ postId });
    },
    enabled: !!postId, 
  });
};
