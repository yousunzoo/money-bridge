import Link from "next/link";
import React from "react";
interface ConsultationStatue {
  applyCount: number;
  isNewApply: boolean;
  confirmCount: number;
  isNewConfirm: boolean;
  completeCount: number;
  isNewComplete: boolean;
}
function ConsultationStatus({
  applyCount,
  isNewApply,
  confirmCount,
  isNewConfirm,
  completeCount,
  isNewComplete,
}: ConsultationStatue) {
  return (
    <section className="mt-8 flex h-auto w-[380px] justify-between rounded-lg bg-white px-6 py-6 shadow-xl ">
      <div>
        <h2 className="text-lg mb-2 border-b-1 border-background-disabled py-2 font-bold ">상담현황</h2>
        <div>
          <div className="bg-gray-300 w-1/2 text-sm">
            <div className="flex w-[160px] justify-between ">
              <div>
                {isNewApply && <div className="h-1 w-1 rounded-xl bg-status-alert"></div>}
                <span>신규예약</span>
              </div>
              <p className="font-bold">{applyCount} 건</p>
            </div>
            <div className="flex w-[160px] justify-between ">
              <div>
                {isNewConfirm && <div className="h-1 w-1 rounded-xl bg-status-alert"></div>}
                <span>예약확정</span>
              </div>
              <p className="font-bold">{confirmCount} 건</p>
            </div>
            <div className="flex w-[160px] justify-between ">
              <div>
                {isNewComplete && <div className="h-1 w-1 rounded-xl bg-status-alert"></div>}
                <span>상담완료</span>
              </div>
              <p className="font-bold">{completeCount} 건</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between ">
        <Link
          href="/schedule"
          className="h-[30] w-[132px] rounded-md border-1 border-primary-normal bg-white py-[14px]  text-center text-sm font-bold  text-primary-normal"
        >
          나의 후기
        </Link>
        <Link
          href="/schedule"
          className="h-[30] w-[132px] rounded-md bg-primary-normal py-[14px] text-center text-sm font-bold text-white "
        >
          일정 관리
        </Link>
      </div>
    </section>
  );
}

export default ConsultationStatus;
