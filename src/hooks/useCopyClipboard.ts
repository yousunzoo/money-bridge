import { useState } from "react";

const useCopyClipboard = (copy: string) => {
  const [isCopyOpen, setIsCopyOpen] = useState(false);
  const [isCopy, setIsCopy] = useState(false);

  const addressCopy = () => {
    setIsCopyOpen(true);
    setIsCopy(!isCopy);
    navigator.clipboard.writeText(copy);
  };

  const copyContents = {
    content: "주소가 복사되었습니다.",
    confirmText: "확인",
    confirmFn: () => {
      setIsCopyOpen(false);
    },
  };

  return { isCopyOpen, isCopy, setIsCopyOpen, addressCopy, copyContents };
};

export default useCopyClipboard;
