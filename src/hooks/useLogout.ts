import { removeCookie } from "@/utils/cookies";
import { userLogout } from "@/app/apis/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(userLogout, {
    onSuccess: () => {
      removeCookie("Authorization");
      removeCookie("refreshToken");
      queryClient.resetQueries();
      router.replace("/");
    },
    onError: () => {
      removeCookie("Authorization");
      removeCookie("refreshToken");
      queryClient.resetQueries();
      router.replace("/");
    },
  });

  return mutate;
};
