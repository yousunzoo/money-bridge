import { userJoin } from "@/app/apis/services/auth";
import { useAuthenticationStore } from "@/store/authenticationStore";
import { useJoinStore } from "@/store/joinStore";
import { IModalContent } from "@/types/common";
import { IResponseErrorData } from "@/types/join";
import { setCookie } from "@/utils/cookies";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";

export const useUserJoin = (
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setModalContent: React.Dispatch<React.SetStateAction<IModalContent>>,
) => {
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
    onError: (err: AxiosError) => {
      const errorStatus = err.response?.status;

      if (errorStatus === 400) {
        const errorData = err.response?.data as IResponseErrorData;
        setModalContent({
          content: errorData.data.value,
          confirmText: "재입력",
          confirmFn: () => {
            setModalOpen(false);
          },
        });
      } else if (errorStatus === 500) {
        setModalContent({
          content: "일시적인 오류가 발생했습니다.",
          confirmText: "재입력",
          confirmFn: () => {
            setModalOpen(false);
          },
        });
      }
      setModalOpen(true);
    },
  });
  return mutate;
};
