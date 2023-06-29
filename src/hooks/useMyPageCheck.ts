import { getLoginedUserInfo, userLogout } from "@/app/apis/services/auth";
import { ILoginedUserInfo, IModalContents } from "@/types/common";
import { getCookie, removeCookie } from "@/utils/cookies";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export const useMyPageCheck = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [modalContents, setModalContents] = useState<IModalContents>({ content: "", confirmText: "" });

  const token = getCookie("Authorization");
  const {
    data: loginedUserInfo,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["myPage"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: true,
  });

  const { mutate: logout } = useMutation<unknown, AxiosError>(userLogout, {
    onSuccess: () => {
      router.replace("/");
      queryClient.resetQueries();
    },
  });

  const handleLogout = () => {
    setIsOpen(true);
    setModalContents({
      content: "로그아웃 하시겠습니까?",
      confirmText: "로그아웃",
      cancelText: "취소",
      confirmFn: () => {
        logout();
      },
    });
  };

  return { loginedUserInfo, isLoading, isError, logout, isOpen, setIsOpen, modalContents, handleLogout };
};
