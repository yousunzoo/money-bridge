import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { ILoginedUserInfo } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetUserInfo = () => {
  const {
    data: userInfo,
    isLoading: userLoading,
    isSuccess: isLogined,
    isError: isLoginError,
  } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["loginedUserInfo"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });

  return { userInfo, userLoading, isLogined, isLoginError };
};
