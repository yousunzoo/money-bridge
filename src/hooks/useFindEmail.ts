import { findEmail } from "@/app/apis/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";

export const useFindEmail = (setIsOpen: ((value: React.SetStateAction<boolean>) => void) | undefined) => {
  const router = useRouter();
  const pathName = usePathname();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(findEmail, {
    onSuccess: data => {
      console.log(data);
      queryClient.setQueryData(["findEmail"], data);
      if (data.data[0].email) {
        router.push(`/findEmail/${pathName.split("/")[2]}/informationCheck`);
      } else {
        if (setIsOpen) setIsOpen(true);
      }
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });
  return mutate;
};
