import { IAccordianItemProps } from "@/types/my";
import Image from "next/image";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

function AccordianItem({ listItem, nowClicked, setNowClicked }: IAccordianItemProps) {
  const [isCollapse, setIsCollapse] = useState(true);
  const liRef = useRef<HTMLLIElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLLIElement>) => {
      event.stopPropagation();
      if (!liRef.current || !contentRef.current) return;
      if (event.target instanceof HTMLParagraphElement) return;

      if (!isCollapse) {
        contentRef.current.classList.add("h-0");
      } else {
        contentRef.current.classList.remove("h-0");
      }
      setNowClicked(liRef.current.id);
      setIsCollapse(!isCollapse);
    },
    [isCollapse],
  );

  useEffect(() => {
    if (!liRef.current || !contentRef.current || !nowClicked) return;
    if (liRef.current.id !== nowClicked && !isCollapse) {
      contentRef.current.classList.add("h-0");
      setIsCollapse(true);
      return;
    }
  }, [nowClicked]);

  return (
    <li onClick={handleClick} id={String(listItem.id)} ref={liRef} className="mb-4 cursor-pointer px-4">
      <div className="flex items-center justify-between border-b-1 border-button-inactive pb-4">
        <span className="w-2/12 text-gray-heavy">[{listItem.label ? listItem.label : "공지"}]</span>
        <span className="mr-auto w-7/12 overflow-ellipsis">{listItem.title}</span>
        {listItem.date && <span className="w-3/12 text-gray-heavy">{listItem.date}</span>}
        <Image
          src="/assets/images/arrowDown.svg"
          width={20}
          height={20}
          className={`${!isCollapse && "rotate-180"}`}
          alt="펼치기"
        />
      </div>
      <div ref={contentRef} className="h-0 overflow-hidden">
        <p className="py-4">{listItem.title}</p>
        <p className="break-keep pb-4 text-sm">{listItem.content}</p>
      </div>
    </li>
  );
}

export default AccordianItem;
