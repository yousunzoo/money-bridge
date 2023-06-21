import { pbJoin } from "@/app/apis/services/auth";
import { useAuthenticationStore } from "@/store/authenticationStore";
import { useJoinStore } from "@/store/joinStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const usePBJoin = () => {
  const { resetInformations } = useJoinStore();
  const { resetCode } = useAuthenticationStore();

  const { mutate } = useMutation(pbJoin, {
    onSuccess: data => {
      console.log(data);
      resetInformations();
      resetCode();
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });
  return mutate;
};
