import React from "react";
interface ConsultationStatue {
  applyCount: number;
  isNewApply: boolean;
  confirmCount: number;
  isNewConfirm: boolean;
  completeCount: number;
  isNewComplete: boolean;
}
function UserConsultationStatus({
  applyCount,
  isNewApply,
  confirmCount,
  isNewConfirm,
  completeCount,
  isNewComplete,
}: ConsultationStatue) {
  return (
    <section className="mt-8  flex h-auto w-[380px] flex-col justify-between rounded-lg bg-white px-6 py-6 shadow-xl ">
      <div>
        <h2 className="text-lg mb-2 border-b-1 border-background-disabled py-2 font-bold ">상담현황</h2>
      </div>
      <div className="mt-2 flex justify-between">
        <div className="flex h-[68] w-[104px] flex-col items-center rounded-md border-1 border-b-secondary-heavy bg-white py-[14px] text-center  text-sm font-bold text-secondary-heavy">
          <div className="relative h-8 w-8 text-xl">
            {isNewApply && <div className="absolute right-0 top-0 h-2 w-2 rounded-xl bg-status-alert"></div>}
            {applyCount}
          </div>
          예약신청
        </div>
        <div className="flex h-[68] w-[104px] flex-col items-center rounded-md border-1 border-b-secondary-heavy bg-white py-[14px]  text-center text-sm font-bold text-secondary-heavy">
          <div className="relative h-8 w-8 text-xl">
            {isNewConfirm && <div className="absolute right-0 top-0 h-2 w-2 rounded-xl bg-status-alert"></div>}
            {confirmCount}
          </div>
          예약신청
        </div>
        <div className="flex h-[68] w-[104px] flex-col items-center rounded-md border-1 border-b-secondary-heavy bg-white py-[14px]  text-center text-sm font-bold text-secondary-heavy">
          <div className="relative h-8 w-8 text-xl">
            {isNewComplete && <div className="absolute right-0 top-0 h-2 w-2 rounded-xl bg-status-alert"></div>}
            {completeCount}
          </div>
          예약신청
        </div>
      </div>
    </section>
  );
}

export default UserConsultationStatus;
