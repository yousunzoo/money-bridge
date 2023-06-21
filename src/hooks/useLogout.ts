import { removeCookie } from "@/utils/cookies";
import { userLogout } from "@/app/apis/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export const useLogout = () => {
  const router = useRouter();
  const { resetUser } = useUserStore();
  const { mutate } = useMutation(userLogout, {
    onSuccess: data => {
      console.log(data.data);
      removeCookie("Authorization");
      resetUser();
      router.push("/");
    },
  });

  return mutate;
};
