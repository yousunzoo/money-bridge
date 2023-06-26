import { editPBMyProfile } from "@/app/apis/services/pb";
import { ILoginedUserInfo } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useEditProfile = () => {
  const router = useRouter();
  const { id } = useQueryClient().getQueryData(["loginedUserInfo"]) as ILoginedUserInfo;
  const { mutate } = useMutation<null, AxiosError, FormData>(["editProfile"], editPBMyProfile, {
    onSuccess: () => {
      router.push(`/detail/info/${id}`);
    },
  });
  return mutate;
};
