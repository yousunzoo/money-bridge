import Image from "next/image";
import React from "react";
import arrow from "/public/assets/images/bottomArrow.svg";
import { CounselingModalProps } from "@/types/management";

function CounselingModal({ visitOpenHandler, type, isOpenVisit, selectTypeHandler }: CounselingModalProps) {
  return (
    <div className="relative flex justify-between">
      <span className="font-bold">상담 방식</span>
      <button
        onClick={visitOpenHandler}
        className="flex w-[150px] items-center rounded-md bg-primary-normal py-1 text-white"
      >
        <span className="flex flex-1 items-center justify-center pl-5">
          {type === "VISIT" ? "방문 상담" : "유선 상담"}
        </span>
        <div className="mr-3 flex items-center justify-end">
          <Image src={arrow} alt={arrow} width={12} height={12} />
        </div>
      </button>
      {isOpenVisit && (
        <div className="absolute right-0 top-9 z-10 flex h-[80px] w-[150px] flex-col items-center justify-center rounded-md bg-background-secondary px-2 py-1">
          <button
            onClick={() => selectTypeHandler("VISIT")}
            className="my-1  px-3 py-1 text-[14px] font-bold text-gray-heavy hover:text-primary-normal"
          >
            방문 상담
          </button>
          <div className="w-[80px] border-t-1"></div>
          <button
            onClick={() => selectTypeHandler("CALL")}
            className="my-1 px-5 py-1 text-[14px] font-bold text-gray-heavy hover:text-primary-normal"
          >
            유선 상담
          </button>
        </div>
      )}
    </div>
  );
}

export default CounselingModal;
