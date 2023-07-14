"use client";
import { useEffect, useState } from "react";
import ButtonModal from "./ButtonModal";
import { useRouter } from "next/navigation";
interface ErrorModalProps {
  isError: boolean;
  path?: string;
  content: string;
}
function ErrorModal({ isError, path, content }: ErrorModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const routerPath = path ? path : "/";
  const ERROR_MESSAGE = {
    content,
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
