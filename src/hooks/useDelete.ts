import { useState } from "react";

const useDelete = (id: number, api: any) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const deleteHandler = () => {
    if (isDeleteOpen) {
      setIsDeleteOpen(false);
      api(id);
    }
  };

  const deleteContents = {
    content: "삭제하시겠습니까?",
    confirmText: "확인",
    cancelText: "취소",
    confirmFn: () => setIsDeleteOpen(true),
    cancelFn: () => setIsDeleteOpen(false),
  };

  return { isDeleteOpen, setIsDeleteOpen, deleteHandler, deleteContents };
};

export default useDelete;
