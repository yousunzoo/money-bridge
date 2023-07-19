import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookMarkPB, postBookMarkPB } from "@/app/apis/services/user";
import { AxiosError } from "axios";
import useErrorShow from "@/hooks/useErrorShow";

const usePbBookMark = (bookmarkState: boolean, link: string, isRefetch:boolean, queryKey?: string[] | string) => {
  const { isOpen, setIsOpen, error, errorHandler } = useErrorShow();
  const [isBookmark, setIsBookMark] = useState(bookmarkState);
  const [isBookmarkedOpen, setIsBookmarkedOpen] = useState(false);
  const router = useRouter();
 const queryClient = useQueryClient();

  const { mutate: postbookMarkPB } = useMutation(postBookMarkPB, {
    onSuccess: () => {
      if (isRefetch) queryClient.refetchQueries([queryKey]);
    },
    onError: (err: AxiosError) => {
      errorHandler(err);
    },
  });

  const { mutate: deletebookMarkPB } = useMutation(deleteBookMarkPB, {
    onSuccess: () => {
      if (isRefetch) queryClient.refetchQueries([queryKey]);
    },
    onError: (err: AxiosError) => {
      errorHandler(err);
    },
  });

  const bookMarkHandler = (id: number) => {
    setIsBookmarkedOpen(true);
    if (isBookmark) {
      deletebookMarkPB({ id: id });
    } else {
      postbookMarkPB({ id: id });
    }
    setIsBookMark(!isBookmark);
  };

  const bookMarkContents = {
    content: bookmarkState
      ? `북마크${isBookmark === false ? "가 해제" : "가 추가"}되었습니다.`
      : `북마크${isBookmark === true ? "가 추가" : "가 해제"}되었습니다.`,
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
    isBookmarkedOpen,
    setIsBookmarkedOpen,
    bookMarkHandler,
    bookMarkContents,
    isOpen,
    isBookmark,
    setIsOpen,
    error,
  };
};

export default usePbBookMark;
