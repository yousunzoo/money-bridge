import { ConsultationTimeCardProps } from "@/types/schedule";
import Link from "next/link";

function ConsultationTimeCard({ consultStart, consultEnd, consultNotice }: ConsultationTimeCardProps) {
  return (
    <div className="mt-6 flex h-[220px] w-full flex-col items-center bg-[#E7D7C3] px-4 py-6">
      <div className="text-lg self-start pl-3 font-bold">상담 가능 시간을 확인해주세요.</div>
      <div className="mt-5 flex h-[64px]  w-full flex-col justify-center bg-[#DFC3A2] pl-5 text-xs">
        <p>· 상담 가능한 시간 {`${consultStart} ~ ${consultEnd}`}</p>
        <p>· 상담 불가한 시간 {consultNotice}</p>
      </div>

      <Link
        href={"/schedule/changeTime"}
        className="mt-4 flex h-[50px] w-full items-center justify-center rounded-md bg-[#453015] text-sm text-white "
      >
        업무 시간 변경하기
      </Link>
    </div>
  );
}

export default ConsultationTimeCard;
