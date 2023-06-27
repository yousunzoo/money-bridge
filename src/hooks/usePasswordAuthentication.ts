import { passwordAuthentication } from "@/app/apis/services/auth";
import { useAuthenticationStore } from "@/store/authenticationStore";
import { IModalContent } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";

export const usePasswordAuthentication = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setModalContent: React.Dispatch<React.SetStateAction<IModalContent>>,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathName = usePathname();
  const { setCode } = useAuthenticationStore();

  const { mutate } = useMutation(passwordAuthentication, {
    onSuccess: data => {
      console.log(data);
      queryClient.setQueryData(["findPassword"], data);
      if (data.data.id) {
        setCode(data.data.code);
      }

      setModalContent({
        content: `${data.data.id ? "인증코드가 발송되었습니다." : "사용자가 존재하지 않습니다."}`,
        confirmText: "확인",
        confirmFn: () => {
          setIsOpen(false);
          data.data.id && router.push(`/findPassword/${pathName.split("/")[2]}/authentication`);
        },
      });
      setIsOpen(true);
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });
  return mutate;
};
