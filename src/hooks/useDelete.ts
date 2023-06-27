import { useState } from "react";

const useDelete = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const deleteHandler = (id: number, mutate: any) => {
    setIsDeleteOpen(true);
    mutate({ id: id });
  };

  const deleteContents = {
    content: "댓글이 삭제되었습니다.",
    confirmText: "확인",
    confirmFn: () => setIsDeleteOpen(false),
  };

  return { isDeleteOpen, setIsDeleteOpen, deleteHandler, deleteContents };
};

export default useDelete;
