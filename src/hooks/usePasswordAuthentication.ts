import { passwordAuthentication } from "@/app/apis/services/auth";
import { useAuthenticationStore } from "@/store/authenticationStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const usePasswordAuthentication = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setModalError: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();
  const { setCode } = useAuthenticationStore();

  const { mutate } = useMutation(passwordAuthentication, {
    onSuccess: data => {
      console.log(data);
      queryClient.setQueryData(["findPassword"], data);
      setModalError(data.data.id === null);
      setIsOpen(true);
      if (data.data.id) {
        setCode(data.data.code);
      }
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });
  return mutate;
};
