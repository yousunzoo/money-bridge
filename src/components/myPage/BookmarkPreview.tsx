import { IBookmarkPreviewProps } from "@/types/my";
import BookmarkPreviewCard from "./BookmarkPreviewCard";

function BookmarkPreview({ boardBookmark, pbBookmark }: IBookmarkPreviewProps) {
  return (
    <section>
      <h3 className="mb-3 text-xl font-bold">북마크</h3>
      <div className="flex w-full justify-between">
        <BookmarkPreviewCard type="board" bookmark={boardBookmark} />
        <BookmarkPreviewCard type="pb" bookmark={pbBookmark} />
      </div>
    </section>
  );
}

export default BookmarkPreview;
