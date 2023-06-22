import { resetPassword } from "@/app/apis/services/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useResetPassword = () => {
  const router = useRouter();

  const { mutate } = useMutation(resetPassword, {
    onSuccess: data => {
      console.log(data);
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });
  return mutate;
};
