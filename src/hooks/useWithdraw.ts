import { userWithdraw } from "@/app/apis/services/auth";
import { useUserStore } from "@/store/userStore";
import { removeCookie } from "@/utils/cookies";
import { useMutation } from "@tanstack/react-query";

export const useWithdraw = () => {
  const { resetUser } = useUserStore();
  const {
    mutate: withdraw,
    isSuccess: IsWithdrawed,
    isError: withdrawError,
  } = useMutation(userWithdraw, {
    onSuccess: () => {
      removeCookie("Authorization");
      resetUser();
    },
  });
  return { withdraw, IsWithdrawed, withdrawError };
};
