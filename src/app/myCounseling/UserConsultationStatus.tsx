import React from "react";
interface ConsultationStatue {
  applyCount: number;
  isNewApply: boolean;
  confirmCount: number;
  isNewConfirm: boolean;
  completeCount: number;
  isNewComplete: boolean;
}

const boxStyle =
  "flex h-[68] w-[104px] flex-col items-center rounded-md border-1 border-b-secondary-heavy bg-white py-[14px] text-center  text-sm font-bold text-secondary-heavy";

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
        <h2 className="py-2 mb-2 text-lg font-bold border-b-1 border-background-disabled ">상담현황</h2>
      </div>
      <div className="flex justify-between mt-2">
        <div className={boxStyle}>
          <div className="relative w-8 h-8 text-xl">
            {isNewApply && <div className="absolute top-0 right-0 w-2 h-2 rounded-xl bg-status-alert"></div>}
            {applyCount}
          </div>
          예약신청
        </div>
        <div className={boxStyle}>
          <div className="relative w-8 h-8 text-xl">
            {isNewConfirm && <div className="absolute top-0 right-0 w-2 h-2 rounded-xl bg-status-alert"></div>}
            {confirmCount}
          </div>
          예약확정
        </div>
        <div className={boxStyle}>
          <div className="relative w-8 h-8 text-xl">
            {isNewComplete && <div className="absolute top-0 right-0 w-2 h-2 rounded-xl bg-status-alert"></div>}
            {completeCount}
          </div>
          상담완료
        </div>
      </div>
    </section>
  );
}

export default UserConsultationStatus;
