import { useState } from "react";

const useReplyDelete = () => {
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const replyHandler = (id: number, mutate: any) => {
    setIsReplyOpen(true);
    mutate({ id: id });
  };

  const replyContents = {
    content: "삭제되었습니다.",
    confirmText: "확인",
    confirmFn: () => setIsReplyOpen(false),
  };

  return { isReplyOpen, setIsReplyOpen, replyHandler, replyContents };
};

export default useReplyDelete;
