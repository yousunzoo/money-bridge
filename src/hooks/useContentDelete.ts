import { useState } from "react";
import { useRouter } from "next/navigation";
import { ILoginedUserInfo } from "@/types/common";

const useContentDelete = (userData?: ILoginedUserInfo) => {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const deleteHandler = (id: number, mutate: any) => {
    setIsDeleteOpen(true);
    mutate({ id: id });
  };

  const deleteContents = {
    content: "삭제되었습니다.",
    confirmText: "확인",
    confirmFn: () => {
      setIsDeleteOpen(false);
      router.push(`/detail/content/${userData?.id}`);
    },
  };

  return { isDeleteOpen, setIsDeleteOpen, deleteHandler, deleteContents };
};

export default useContentDelete;
