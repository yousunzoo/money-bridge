import { userWithdraw } from "@/app/apis/services/auth";
import { removeCookie } from "@/utils/cookies";
import { useMutation } from "@tanstack/react-query";

export const useWithdraw = () => {
  const {
    mutate: withdraw,
    isSuccess: IsWithdrawed,
    isError: withdrawError,
  } = useMutation(userWithdraw, {
    onSuccess: () => {
      removeCookie("Authorization");
    },
  });
  return { withdraw, IsWithdrawed, withdrawError };
};
