import { userCheckPassword } from "@/app/apis/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCheckPassword = () => {
  const queryClient = useQueryClient();
  const {
    mutate: checkPassword,
    isSuccess: isChecked,
    isError: isNotChecked,
  } = useMutation(userCheckPassword, {
    onSuccess: data => {
      queryClient.setQueryData(["isPwChecked"], true);
    },
  });

  return { checkPassword, isChecked, isNotChecked };
};
