import { editPBMyProfile } from "@/app/apis/services/pb";
import { useMutation } from "@tanstack/react-query";

export const useEditProfile = () => {
  const { mutate } = useMutation(["editProfile"], editPBMyProfile);
  return mutate;
};
