import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../service/auth/auth";

export const useSignUp = () => {
  return useMutation({
    mutationKey: ["useSignUp"],
    mutationFn: signUp,
  });
};
