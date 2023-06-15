import { userJoin } from "@/app/apis/services/auth";
import { useJoinStore } from "@/store/joinStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useJoin = () => {
  const { resetInformations } = useJoinStore();

  const { mutate } = useMutation(userJoin, {
    onSuccess: data => {
      console.log(data);
      resetInformations();
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });
  return mutate;
};
