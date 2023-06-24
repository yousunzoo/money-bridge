import { useState } from "react";
import { useRouter } from "next/navigation";
import { postBookMarkPB, deleteBookMarkPB } from "@/app/apis/services/user";

const usePbBookMark = (isBookmarkeded: boolean, link: string, id: number) => {
  const [isBookmarked, setisBookmarked] = useState(isBookmarkeded);
  const [isBookmarkedOpen, setisBookmarkedOpen] = useState(false);
  const router = useRouter();

  const bookMarkHandler = () => {
    setisBookmarkedOpen(true);
    if (isBookmarked) {
      setisBookmarked(false);
      deleteBookMarkPB(id);
    } else {
      setisBookmarked(true);
      postBookMarkPB(id);
    }
  };

  const bookMarkContents = {
    content: "북마크에 추가되었습니다.",
    confirmText: "확인",
    cancelText: "북마크 바로가기",
    confirmFn: () => {
      setisBookmarkedOpen(false);
    },
    cancelFn: () => {
      router.push(link);
      setisBookmarkedOpen(false);
    },
  };

  return { isBookmarked, isBookmarkedOpen, setisBookmarkedOpen, bookMarkHandler, bookMarkContents };
};

export default usePbBookMark;
