import { IUser, userLogin } from "@/app/apis/services/auth";
import { IResponseLogin } from "@/types/login";
import { setCookie } from "@/utils/cookies";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

export const useLogin = (setNextStep: ((value: React.SetStateAction<boolean>) => void) | undefined) => {
  const router = useRouter();

  const { mutate } = useMutation(userLogin, {
    onSuccess: data => {
      console.log(data);
      if (data.data.data.code) {
        if (setNextStep) {
          setNextStep(true);
        }
      } else {
        setCookie("Authorization", data.headers.authorization);
        alert("환영!");
        router.push("/");
      }
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  return mutate;
};
