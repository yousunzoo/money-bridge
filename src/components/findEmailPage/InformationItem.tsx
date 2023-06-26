import { IFindEmailData } from "@/types/login";
import React from "react";

function InformationItem({ information }: { information: IFindEmailData }) {
  console.log(information);
  return (
    <li className="mb-6 flex w-full flex-col items-center gap-6 rounded-sm border-1 border-primary-normal p-6">
      <div className="flex w-full flex-row justify-between">
        <p className="leading-6">이름</p>
        <p className="font-bold leading-[22px]">{information.name}</p>
      </div>
      <div className="flex w-full flex-row justify-between">
        <p className="leading-6">전화번호</p>
        <p className="font-bold leading-[22px]">{information.phoneNumber}</p>
      </div>
      <div className="flex w-full flex-row justify-between">
        <p className="leading-6">이메일</p>
        <p className="font-bold leading-[22px]">{information.email}</p>
      </div>
    </li>
  );
}

export default InformationItem;
