import { useState } from "react";
import { useRouter } from "next/navigation";

const useBookMark = (isBookmarkeded: any, link: any) => {
  const [isBookmarked, setisBookmarked] = useState(isBookmarkeded);
  const [isBookmarkedOpen, setisBookmarkedOpen] = useState(false);
  const router = useRouter();

  const bookMarkHandler = () => {
    setisBookmarkedOpen(true);
    setisBookmarked(!isBookmarked);
    // 북마크 여부에 따라 추가, 삭제 api호출
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

export default useBookMark;
