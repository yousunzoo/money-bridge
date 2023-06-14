import { useState } from "react";

const useShare = (copy: any) => {
  const [isShare, setIsShare] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [isCopyOpen, setIsCopyOpen] = useState(false);

  const shareHandler = () => {
    setIsShareOpen(true);
    setIsShare(!isShare);
  };

  const shareContents = {
    content: "PB 정보 공유하기",
    confirmText: "카카오톡으로 공유",
    cancelText: "링크 복사",
    confirmFn: () => {
      setIsShareOpen(false);
    },
    cancelFn: () => {
      navigator.clipboard.writeText(copy);
      setIsShareOpen(false);
      setIsCopy(!isCopy);
      setIsCopyOpen(true);
    },
  };

  const copyContents = {
    content: "링크가 복사되었습니다.",
    confirmText: "확인",
    confirmFn: () => {
      setIsCopyOpen(false);
    },
  };

  return {
    isShare,
    isShareOpen,
    setIsShareOpen,
    shareHandler,
    shareContents,
    isCopy,
    isCopyOpen,
    setIsCopyOpen,
    copyContents,
  };
};

export default useShare;
