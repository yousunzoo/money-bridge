import { userLogin } from "@/app/apis/services/auth";
import { useUserStore } from "@/store/userStore";
import { setCookie } from "@/utils/cookies";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";

export const useLogin = (
  setNextStep: ((value: React.SetStateAction<boolean>) => void) | undefined,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setModalError: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const router = useRouter();
  const pathName = usePathname();
  const { setUser } = useUserStore();

  const { mutate } = useMutation(userLogin, {
    onSuccess: data => {
      console.log(data);
      if (data.data.data.code) {
        if (setNextStep) {
          setNextStep(true);
        }
      } else {
        setCookie("Authorization", data.headers.authorization);
        setUser(pathName.split("/")[2].toUpperCase(), data.data.data.name, data.data.data.id);
        alert(`${data.data.data.name}님 환영~`);
        router.push("/");
      }
    },
    onError: (err: AxiosError) => {
      console.log(err);
      setModalError(true);
      setIsOpen(true);
    },
  });

  return mutate;
};
