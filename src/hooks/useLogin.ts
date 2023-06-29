import { userLogin } from "@/app/apis/services/auth";
import { IModalContent } from "@/types/common";
import { IResponseErrorData400, IResponseErrorData404 } from "@/types/login";
import { setCookie } from "@/utils/cookies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useLogin = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setModalContent: React.Dispatch<React.SetStateAction<IModalContent>>,
) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(userLogin, {
    onSuccess: data => {
      setCookie("Authorization", data.headers.authorization);
      queryClient.refetchQueries(["loginedUserInfo"]);
      router.push("/");
    },
    onError: (err: AxiosError) => {
      const errorStatus = err.response?.status;

      if (errorStatus === 400) {
        const errorData = err.response?.data as IResponseErrorData400;
        setModalContent({
          content: errorData.data.value,
          confirmText: "재입력",
          confirmFn: () => {
            setIsOpen(false);
          },
        });
      } else if (errorStatus === 404) {
        const errorData = err.response?.data as IResponseErrorData404;
        setModalContent({
          content: errorData.data,
          confirmText: "재입력",
          confirmFn: () => {
            setIsOpen(false);
          },
        });
      } else if (errorStatus === 500) {
        setModalContent({
          content: "일시적인 오류가 발생했습니다.",
          confirmText: "재입력",
          confirmFn: () => {
            setIsOpen(false);
          },
        });
      }

      setIsOpen(true);
    },
  });

  return mutate;
};
