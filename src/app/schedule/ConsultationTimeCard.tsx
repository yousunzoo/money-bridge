import { ConsultationTimeCardProps } from "@/types/schedule";
import dayjs from "dayjs";
import React from "react";

function ConsultationTimeCard({ consultStart, consultEnd, consultNotice }: ConsultationTimeCardProps) {
  const formattedConsultStart = dayjs(consultStart, "HH:mm:ss").format("HH:mm");
  const formattedconsultEnd = dayjs(consultEnd, "HH:mm:ss").format("HH:mm");

  return (
    <div className="mt-6 flex h-[220px] w-full flex-col items-center bg-[#E7D7C3] px-4 py-6">
      <div className="self-start pl-3 text-lg font-bold">상담 가능 시간을 확인해주세요.</div>
      <div className="mt-5 flex h-[64px]  w-[368px] flex-col justify-center bg-[#DFC3A2] pl-5 text-xs">
        <p>· 상담 가능한 시간 {`${formattedConsultStart} ~ ${formattedconsultEnd}`}</p>
        <p>· 상담 불가한 시간 {consultNotice}</p>
      </div>

      <button className="mt-4 flex h-[50px] w-[150px]  items-center justify-center rounded-xl bg-[#453015] text-sm text-white ">
        업무 시간 변경하기
      </button>
    </div>
  );
}

export default ConsultationTimeCard;
