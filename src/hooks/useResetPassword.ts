import { resetPassword } from "@/app/apis/services/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useResetPassword = () => {
  const router = useRouter();

  const { mutate } = useMutation(resetPassword, {
    onSuccess: data => {},
    onError: (err: AxiosError) => {},
  });
  return mutate;
};
