"use client";
import React from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { truncateContent } from "@/utils/truncateContent";
import { ITempList } from "@/types/contents";

function TemporaryItem({ item }: { item: ITempList }) {
  const router = useRouter();

  const goToTemp = () => {
    router.push(`/contents/edit/${item.id}`);
  };

  const timeShow = () => {
    const createTime = dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss");
    if (!item.updatedAt) return createTime;
    const updateTime = dayjs(item.updatedAt).format("YYYY-MM-DD HH:mm:ss");
    if (updateTime >= createTime) {
      return updateTime;
    } else {
      return createTime;
    }
  };

  return (
    <li className="card flex h-56 cursor-pointer flex-col justify-center bg-white p-6" onClick={goToTemp}>
      <div className="flex items-center">
        <div className="mr-6 text-base font-bold">{item.title}</div>
        <div className="text-sm">{timeShow()}</div>
      </div>
      <div className="mt-4 h-[120px] rounded-sm bg-background-normal p-3"> {truncateContent(item.content, 20)}</div>
    </li>
  );
}

export default TemporaryItem;
