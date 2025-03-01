import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser, unfollowUser } from "../../service/user/user"; 


    //Olhar Codigo para verificaçao se esta logado ou nao, e persistecia de dados!.
    export const useFollowUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
    mutationFn: async ({ userId, isFollowing }: { userId: string; isFollowing: boolean }) => {
      if (isFollowing) {
        return await unfollowUser(userId); 
      } else {
        return await followUser(userId); 
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] }); 
    },
    onError: (error) => {
      console.error("Erro ao seguir/deixar de seguir:", error);
    },
  });
};