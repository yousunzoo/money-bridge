import { styleCase } from "@/utils/consultStyle";
import { showName } from "@/utils/userNameFormat";
import dayjs from "dayjs";
import { IPbReview } from "@/types/pb";

function PbReviewItem({ item }: { item: IPbReview }) {
  return (
    <li className="card h-[200px] p-[15px]">
      <div className="mb-[9px] flex items-end">
        <div className="mr-2 text-sm font-bold">{showName(item.userName)} 님</div>
        <div className="text-xs">{dayjs(item.createdAt).format("YYYY.MM.DD")}</div>
      </div>
      <div className="h-[90px] whitespace-normal rounded-md bg-background-secondary p-3.5 text-xs">
        {item.content ? item.content : "작성된 후기가 없습니다."}
      </div>
      <ul className="mt-3 flex">
        {item.list.map((styles: any, idx: number) => (
          <li key={idx} className="option mr-[8px] flex h-[35px] w-[78px] items-center justify-center p-0">
            {styleCase(styles?.style)?.style}
          </li>
        ))}
      </ul>
    </li>
  );
}

export default PbReviewItem;
