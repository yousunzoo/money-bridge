import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookMarkContent, postBookMarkContent } from "@/app/apis/services/user";
import { AxiosError } from "axios";
import useErrorShow from "@/utils/errorShow";

const useContentBookMark = (isBookmarked: boolean, link: string, queryKey?: string | string[]) => {
  const { isOpen, setIsOpen, error, errorHandler } = useErrorShow();
  const [isBookmark, setIsBookmark] = useState(isBookmarked);
  const [isBookmarkedOpen, setIsBookmarkedOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: postbookMarkContent } = useMutation(postBookMarkContent, {
    onSuccess: () => {
      queryClient.refetchQueries([queryKey]);
    },
    onError: (err: AxiosError) => {
      errorHandler(err);
    },
  });

  const { mutate: deletebookMarkContent } = useMutation(deleteBookMarkContent, {
    onSuccess: () => {
      queryClient.refetchQueries([queryKey]);
    },
    onError: (err: AxiosError) => {
      errorHandler(err);
    },
  });

  const bookMarkHandler = (id: number) => {
    setIsBookmarkedOpen(true);
    if (isBookmarked) {
      deletebookMarkContent({ id: id });
    } else {
      postbookMarkContent({ id: id });
    }
  };

  const bookMarkContents = {
    content: isBookmarked ? "북마크에 추가되었습니다." : "북마크가 해제되었습니다.",
    confirmText: "확인",
    cancelText: "북마크 바로가기",
    confirmFn: () => {
      setIsBookmarkedOpen(false);
    },
    cancelFn: () => {
      router.push(link);
      setIsBookmarkedOpen(false);
    },
  };

  return {
    isBookmark,
    isBookmarkedOpen,
    setIsBookmarkedOpen,
    bookMarkHandler,
    bookMarkContents,
    isOpen,
    setIsOpen,
    error,
  };
};

export default useContentBookMark;
