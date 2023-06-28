"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { truncateContent } from "@/utils/truncateContent";
import { ITempList } from "@/types/contents";
import { timeShow } from "@/utils/timeShow";

function TemporaryItem({ item }: { item: ITempList }) {
  const router = useRouter();

  const goToTemp = () => {
    router.push(`/contents/edit/${item.id}`);
  };

  return (
    <li className="card flex h-56 cursor-pointer flex-col justify-center bg-white p-6" onClick={goToTemp}>
      <div className="flex items-center">
        <div className="mr-6 text-base font-bold">{item.title}</div>
        <div className="text-sm">{timeShow(item.createdAt, item.updatedAt)}</div>
      </div>
      <div className="mt-4 h-[120px] whitespace-normal rounded-sm bg-background-normal p-3">
        {truncateContent(item.content, 20)}
      </div>
    </li>
  );
}

export default TemporaryItem;
