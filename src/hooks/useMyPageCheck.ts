import { getLoginedUserInfo, userLogout } from "@/app/apis/services/auth";
import { IModalContents } from "@/types/common";
import { removeCookie } from "@/utils/cookies";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useMyPageCheck = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [modalContents, setModalContents] = useState<IModalContents>({ content: "", confirmText: "" });
  const [loading, setLoading] = useState(true);

  const {
    data: loginedUserInfo,
    isLoading: userLoading,
    isSuccess: isLogined,
  } = useQuery({
    queryKey: ["loginedUserInfo"],
    queryFn: getLoginedUserInfo,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const { mutate: logout } = useMutation(userLogout, {
    onSuccess: () => {
      router.replace("/");
      removeCookie("Authorization");
      removeCookie("refreshToken");
      queryClient.removeQueries(["loginedUserInfo"]);
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

  useEffect(() => {
    if (!userLoading && !isLogined) {
      redirect("/login");
    }
    if (userLoading) {
      setLoading(true);
      return;
    }
    setLoading(false);
  }, [userLoading, isLogined]);

  return { loginedUserInfo, loading, logout, isOpen, setIsOpen, modalContents, handleLogout };
};
