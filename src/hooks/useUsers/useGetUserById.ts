import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../service/user/user";

export const useGetUserById = (userId: number | null) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      if (!userId) return null;
      return getUserById(userId);
    },
    enabled: !!userId, 
  });
};
