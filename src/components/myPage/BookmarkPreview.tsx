import { IBookmarkPreviewProps } from "@/types/my";
import Image from "next/image";
import BookmarkPreviewCard from "./BookmarkPreviewCard";

function BookmarkPreview({ boardBookmark, userBookmark }: IBookmarkPreviewProps) {
  return (
    <section>
      <h3 className="mb-3 text-xl font-bold">북마크</h3>
      <div className="flex w-full justify-between">
        <BookmarkPreviewCard type="board" bookmark={boardBookmark} />
        <BookmarkPreviewCard type="user" bookmark={userBookmark} />
      </div>
    </section>
  );
}

export default BookmarkPreview;
