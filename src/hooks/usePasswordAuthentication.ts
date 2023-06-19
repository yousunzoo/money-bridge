import { passwordAuthentication } from "@/app/apis/services/auth";
import { useAuthenticationStore } from "@/store/authenticationStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const usePasswordAuthentication = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setCode } = useAuthenticationStore();

  const { mutate } = useMutation(passwordAuthentication, {
    onSuccess: data => {
      console.log(data);
      setCode(data.data.code);
      queryClient.setQueryData(["findPassword"], data);
      router.push(`/findPassword/${data.data.role.toLowerCase()}/authentication`);
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });
  return mutate;
};
