import Image from "next/image";
import React from "react";
import dayjs from "dayjs";
import { ReviewCardProps } from "@/types/common";

function ReviewCardItem({ profileImage, userName, content, createdAt }: ReviewCardProps) {
  const date = dayjs(createdAt);
  const formattedDate = date.format("YYYY.MM.DD");

  return (
    <div className="mx-auto flex max-w-md overflow-hidden rounded-md bg-white p-4 shadow-md">
      <div className="pr-4">
        <Image
          src={profileImage}
          width={120}
          height={120}
          alt="default_profile"
          className=" max-w-[60px] rounded-2xl "
        />
        <h2 className="mb-4 text-center text-sm font-medium ">{userName} 님</h2>
      </div>
      <div className="flex flex-col rounded-lg bg-gray-100 px-6 py-3">
        <p className="text-gray-700">{content}</p>
        <span className="pt-8 text-xs font-medium">{formattedDate}</span>
      </div>
    </div>
  );
}

export default ReviewCardItem;
