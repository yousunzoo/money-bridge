import { userLogin } from "@/app/apis/services/auth";
import { IResponseLogin } from "@/types/login";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useLogin = (setNextStep: ((value: React.SetStateAction<boolean>) => void) | undefined) => {
  const router = useRouter();

  const { mutate } = useMutation(userLogin, {
    onSuccess: (data: IResponseLogin) => {
      if (data.data.data.code) {
        if (setNextStep) {
          setNextStep(true);
        }
      } else {
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
