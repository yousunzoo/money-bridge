import { userLogin } from "@/app/apis/services/auth";
import { useUserStore } from "@/store/userStore";
import { setCookie } from "@/utils/cookies";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";

export const useLogin = (setNextStep: ((value: React.SetStateAction<boolean>) => void) | undefined) => {
  const router = useRouter();
  const pathName = usePathname();
  const { setUser } = useUserStore();

  const { mutate } = useMutation(userLogin, {
    onSuccess: data => {
      console.log(data.data);
      if (data.data.data.code) {
        if (setNextStep) {
          setNextStep(true);
        }
      } else {
        setCookie("Authorization", data.headers.authorization);
        setUser(pathName.split("/")[2].toUpperCase(), data.data.data.name);
        alert(`${data.data.data.name}님 환영~`);
        router.push("/");
      }
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  return mutate;
};
