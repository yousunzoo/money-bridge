import { editPBMyProfile } from "@/app/apis/services/pb";
import { ILoginedUserInfo } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useEditProfile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = queryClient.getQueryData(["loginedUserInfo"]) as ILoginedUserInfo;
  const { mutate } = useMutation<null, AxiosError, FormData>(["editProfile"], editPBMyProfile, {
    onSuccess: () => {
      router.push(`/detail/info/${id}`);
      queryClient.refetchQueries(["getPBInfo"]);
    },
  });
  return mutate;
};
