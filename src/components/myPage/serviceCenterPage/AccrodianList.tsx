"use client";

import { useState } from "react";
import AccordianItem from "./AccordianItem";
import { IAccordianListProps } from "@/types/my";

function AccrodianList({ list }: IAccordianListProps) {
  const [nowClicked, setNowClicked] = useState<string | null>(null);
  return (
    <ul>
      {list.map(listItem => (
        <AccordianItem key={listItem.id} nowClicked={nowClicked} setNowClicked={setNowClicked} listItem={listItem} />
      ))}
    </ul>
  );
}

export default AccrodianList;
