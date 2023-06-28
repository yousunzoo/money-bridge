import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookMarkPB, postBookMarkPB } from "@/app/apis/services/user";
import { AxiosError } from "axios";

const usePbBookMark = (isBookmarked: boolean, link: string, queryKey?: string[] | string) => {
  const [isBookmark, setIsBookmark] = useState(isBookmarked);
  const [isBookmarkedOpen, setIsBookmarkedOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: postbookMarkPB } = useMutation(postBookMarkPB, {
    onSuccess: () => {
      queryClient.refetchQueries([queryKey]);
    },
    onError: (err: AxiosError) => {},
  });

  const { mutate: deletebookMarkPB } = useMutation(deleteBookMarkPB, {
    onSuccess: () => {
      queryClient.refetchQueries([queryKey]);
    },
    onError: (err: AxiosError) => {},
  });

  const bookMarkHandler = (id: number) => {
    setIsBookmarkedOpen(true);
    if (isBookmarked) {
      setIsBookmark(false);
      deletebookMarkPB({ id: id });
    } else {
      setIsBookmark(true);
      postbookMarkPB({ id: id });
    }
  };

  const bookMarkContents = {
    content: "북마크에 추가되었습니다.",
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

  return { isBookmark, isBookmarkedOpen, setIsBookmarkedOpen, bookMarkHandler, bookMarkContents };
};

export default usePbBookMark;
