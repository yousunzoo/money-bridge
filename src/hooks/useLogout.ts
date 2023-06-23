import { removeCookie } from "@/utils/cookies";
import { userLogout } from "@/app/apis/services/auth";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export const useLogout = () => {
  const { mutate } = useMutation(userLogout, {
    onSuccess: data => {
      console.log(data.data);
      removeCookie("Authorization");
      removeCookie("refreshToken");
      redirect("/");
    },
  });

  return mutate;
};
