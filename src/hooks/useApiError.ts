"use client";
import { IModalContents } from "@/types/common";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface ErrorProps {
  data: string;
  status: number;
  msg: string;
}

const ERROR_MESSAGES: { [key: number]: string } = {
  400: "일시적인 문제가 발생했습니다. 다시 시도해주세요.",
  403: "권한이 없습니다. 다시 시도해주세요.",
  404: "일시적인 문제가 발생했습니다. 다시 시도해주세요.",
  500: "일시적인 문제가 발생했습니다. 다시 시도해주세요.",
};

const useApiError = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [modalContents, setModalContents] = useState<IModalContents>({ content: "", confirmText: "" });

  const handleError = useCallback((axiosError: any) => {
    const errorResponse = axiosError.message as ErrorProps;
    const status = errorResponse.status;
    const data = errorResponse.data;

    if (data === "투자성향 분석이 되지않았습니다.") return;
    if (data === "이미 로그아웃한 액세스 토큰입니다") return;
    if (ERROR_MESSAGES[status]) {
      setModalContents({
        content: ERROR_MESSAGES[status],
        confirmText: "확인",
        confirmFn: () => router.push("/"),
      });
      setIsOpen(true);
    }
  }, []);

  return { handleError, isOpen, modalContents, setIsOpen } as const;
};

export default useApiError;