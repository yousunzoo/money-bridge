import { emailAuthentication } from "@/app/apis/services/auth";
import { useAuthenticationStore } from "@/store/authenticationStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useAuthentication = () => {
  const { setCode } = useAuthenticationStore();
  const { mutate } = useMutation(emailAuthentication, {
    onSuccess: data => {
      console.log(data);
      setCode(data.data.code);
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });
  return mutate;
};
