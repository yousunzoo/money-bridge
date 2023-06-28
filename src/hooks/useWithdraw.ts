import { userWithdraw } from "@/app/apis/services/auth";
import { removeCookie } from "@/utils/cookies";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useWithdraw = () => {
  const queryClient = useQueryClient();
  const {
    mutate: withdraw,
    isSuccess: IsWithdrawed,
    isError: withdrawError,
  } = useMutation(userWithdraw, {
    onSuccess: () => {
      removeCookie("Authorization");
      removeCookie("refreshToken");
      queryClient.resetQueries();
    },
  });
  return { withdraw, IsWithdrawed, withdrawError };
};
