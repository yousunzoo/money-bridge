import { IModalContent } from "@/types/common";
import { useState } from "react";

export const useSetModalContent = () => {
  const modalContents_Default = {
    content: "일시적인 오류가 발생했습니다.",
    confirmText: "확인",
    confirmFn: () => {
      setIsOpen(false);
    },
  };
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<IModalContent>(modalContents_Default);
  const [modalSubContent, setModalSubContent] = useState("정보를 확인해 주세요");

  return { isOpen, modalContent, modalSubContent, setIsOpen, setModalContent, setModalSubContent };
};
