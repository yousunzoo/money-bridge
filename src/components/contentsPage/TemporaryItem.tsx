"use client";
import React from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

function TemporaryItem({ item }: { item: any }) {
  const router = useRouter();

  const goToTemp = () => {
    router.push(`/contents/temporary/${item.id}`);
  };

  const timeShow = () => {
    const createTime = dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss");
    const updateTime = dayjs(item.updatedAt).format("YYYY-MM-DD HH:mm:ss");
    if (updateTime >= createTime) {
      return updateTime;
    } else {
      return createTime;
    }
  };

  return (
    <li className="card h-56 cursor-pointer bg-white" onClick={goToTemp}>
      <div>
        <div>{item.title}</div>
        <div>{timeShow()}</div>
      </div>
      <div>{item.content}</div>
    </li>
  );
}

export default TemporaryItem;
