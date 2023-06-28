import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { ILoginedUserInfo } from "@/types/common";
import { getCookie } from "@/utils/cookies";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetUserInfo = () => {
  const token = getCookie("Authorization");
  const {
    data: userInfo,
    isLoading: userLoading,
    isSuccess: isLogined,
    isError: isLoginError,
  } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["loginedUserInfo"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
    enabled: !!token,
    staleTime: Infinity,
  });

  return { userInfo, userLoading, isLogined, isLoginError };
};
