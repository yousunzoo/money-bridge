import { userLogin } from "@/app/apis/services/auth";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface IResponseLogin {
  status: number;
  msg: string;
  data: {
    id: number;
    code: string | null;
  };
}

export const useLogin = (setNextStep: ((value: React.SetStateAction<boolean>) => void) | undefined) => {
  const router = useRouter();

  const { mutate } = useMutation(userLogin, {
    onSuccess: data => {
      console.log(data.data);
      if (setNextStep) {
        if (data.data.code) {
          setNextStep(true);
        }
      } else {
        router.push("/");
      }
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  return mutate;
};
