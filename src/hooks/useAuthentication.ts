import { joinAuthentication } from "@/app/apis/services/auth";
import { useAuthenticationStore } from "@/store/authenticationStore";
import { useFindPasswordStore } from "@/store/findPasswordStore";
import { IModalContent } from "@/types/common";
import { IResponseErrorData400, IResponseErrorData404 } from "@/types/login";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";

export const useAuthentication = (
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>,
  setModalContent?: React.Dispatch<React.SetStateAction<IModalContent>>,
  setModalSubContent?: React.Dispatch<React.SetStateAction<string>>,
) => {
  const { setCode } = useAuthenticationStore();
  const { setData } = useFindPasswordStore();
  const router = useRouter();
  const pathName = usePathname();
  const currentPath = pathName.split("/")[3];

  const { mutate } = useMutation(joinAuthentication, {
    onSuccess: data => {
      setCode(data.data.code);
      setData(data.data);

      setIsOpen && setIsOpen(true);
      setModalSubContent && setModalSubContent("5분 안에 인증코드를 입력해주세요");
      setModalContent &&
        setModalContent({
          content: `인증코드가 ${currentPath === "authentication" ? "재" : ""}발송되었습니다.`,
          confirmText: "확인",
          confirmFn: () => {
            setIsOpen && setIsOpen(false);
            if (currentPath === "email") {
              router.push(`/join/${pathName.split("/")[2]}/authentication`);
            }
          },
        });
    },
    onError: (err: AxiosError) => {
      const errorStatus = err.response?.status;
      setModalSubContent && setModalSubContent("정보를 확인해주세요.");

      if (setModalContent && setIsOpen) {
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
      }
      setIsOpen && setIsOpen(true);
    },
  });
  return mutate;
};
