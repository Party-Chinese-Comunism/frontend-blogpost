import { useMutation } from "@tanstack/react-query";
import { signIn } from "../../service/auth/auth";

export const useSignIn = () => {
  return useMutation({
    mutationKey: ["useSignIn"],
    mutationFn: signIn,
  });
};
