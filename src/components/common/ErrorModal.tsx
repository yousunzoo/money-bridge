"use client";
import React, { useEffect, useState } from "react";
import ButtonModal from "./ButtonModal";
import { redirect, useRouter } from "next/navigation";

function ErrorModal({ isError, path }: { isError: boolean; path?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const routerPath = path ? path : "/";

  const ERROR_MESSAGE = {
    content: "일시적인 문제가 발생했습니다. 다시 시도해주세요.",
    confirmText: "확인",
    confirmFn: () => router.push(routerPath),
  };

  useEffect(() => {
    if (isError) {
      setIsOpen(true);
    }
  }, [isError]);

  return <ButtonModal modalContents={ERROR_MESSAGE} isOpen={isOpen} setIsOpen={setIsOpen} />;
}

export default ErrorModal;
