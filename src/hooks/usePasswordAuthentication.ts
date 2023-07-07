import { passwordAuthentication } from "@/app/apis/services/auth";
import { useAuthenticationStore } from "@/store/authenticationStore";
import { useFindPasswordStore } from "@/store/findPasswordStore";
import { IModalContent } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";

export const usePasswordAuthentication = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setModalContent: React.Dispatch<React.SetStateAction<IModalContent>>,
  setModalSubContent: React.Dispatch<React.SetStateAction<string>>,
) => {
  const router = useRouter();
  const pathName = usePathname();
  const currentPath = pathName.split("/")[3];
  const { setCode } = useAuthenticationStore();
  const { setData } = useFindPasswordStore();

  const { mutate } = useMutation(passwordAuthentication, {
    onSuccess: data => {
      if (data.data.id) {
        setCode(data.data.code);
        setData(data.data);
      }

      data.data.id && setModalSubContent("5분 안에 인증코드를 입력해주세요.");
      setModalContent({
        content: `${
          data.data.id
            ? `인증코드가 ${currentPath === "authentication" || "password" ? "재" : ""}발송되었습니다.`
            : "사용자가 존재하지 않습니다."
        }`,
        confirmText: "확인",
        confirmFn: () => {
          setIsOpen(false);
          if (currentPath === "enterInformation") {
            data.data.id && router.push(`/findPassword/${pathName.split("/")[2]}/authentication`);
          }
        },
      });

      setIsOpen(true);
    },
    onError: (err: AxiosError) => {},
  });
  return mutate;
};
