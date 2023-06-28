import { userJoin } from "@/app/apis/services/auth";
import { useAuthenticationStore } from "@/store/authenticationStore";
import { useJoinStore } from "@/store/joinStore";
import { setCookie } from "@/utils/cookies";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";

export const useUserJoin = () => {
  const { resetInformations } = useJoinStore();
  const { resetCode } = useAuthenticationStore();
  const pathName = usePathname();
  const joinType = pathName.split("/")[2];
  const router = useRouter();

  const { mutate } = useMutation(userJoin, {
    onSuccess: data => {
      setCookie("Authorization", data.headers.authorization);
      resetInformations();
      resetCode();
      router.push(`/join/${joinType}/complete`);
    },
    onError: (err: AxiosError) => {},
  });
  return mutate;
};
