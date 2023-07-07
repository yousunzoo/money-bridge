import { resetPassword } from "@/app/apis/services/auth";
import { IModalContent } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

export const useResetPassword = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setModalContent: React.Dispatch<React.SetStateAction<IModalContent>>,
  setModalSubContent: React.Dispatch<React.SetStateAction<string>>,
) => {
  const router = useRouter();
  const pathName = usePathname();
  const currentPath = pathName.split("/")[1];

  const { mutate } = useMutation(resetPassword, {
    onSuccess: () => {
      setModalSubContent(currentPath === "findPassword" ? "로그인 후 MONEY BRIDGE를 이용해주세요." : "");
      setModalContent({
        content: "비빌먼호가 재설정 되었습니다.",
        confirmText: currentPath === "findPassword" ? "로그인" : "확인",
        confirmFn: () => {
          setIsOpen(false);
          router.push(currentPath === "findPassword" ? "/login" : "/my/editInfo");
        },
      });
      setIsOpen(true);
    },
    onError: () => {
      setIsOpen(true);
    },
  });
  return mutate;
};
