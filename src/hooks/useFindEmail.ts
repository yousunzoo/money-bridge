import { findEmail } from "@/app/apis/services/auth";
import { IModalContent } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";

export const useFindEmail = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setModalContent: React.Dispatch<React.SetStateAction<IModalContent>>,
) => {
  const router = useRouter();
  const pathName = usePathname();
  const queryClient = useQueryClient();

  const modalContents_NotExist = {
    content: "사용자가 존재하지 않습니다.",
    confirmText: "재입력",
    confirmFn: () => {
      setIsOpen(false);
    },
  };

  const { mutate } = useMutation(findEmail, {
    onSuccess: data => {
      queryClient.setQueryData(["findEmail"], data);
      if (data.data[0].email) {
        router.push(`/findEmail/${pathName.split("/")[2]}/informationCheck`);
      } else {
        setModalContent(modalContents_NotExist);
        setIsOpen(true);
      }
    },
    onError: (err: AxiosError) => {},
  });
  return mutate;
};
