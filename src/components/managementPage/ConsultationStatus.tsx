import { ConsultationStatusFunc } from "@/types/management";
import Link from "next/link";
import React from "react";

function ConsultationStatus({ consultationStatus, pbId }: ConsultationStatusFunc) {
  return (
    <section className="flex justify-between w-full h-auto px-6 py-6 mt-8 bg-white rounded-lg shadow-xl ">
      <div className="mr-6 w-[320px]">
        <h2 className="py-2 mb-2 text-lg font-bold border-b-1 border-background-disabled ">상담현황</h2>
        <div>
          <div className="text-sm bg-gray-300">
            <div className="flex justify-between ">
              <div>
                {consultationStatus.isNewApply && <div className="w-1 h-1 rounded-xl bg-status-alert"></div>}
                <span>신규예약</span>
              </div>
              <p className="font-bold">{consultationStatus.applyCount} 건</p>
            </div>
            <div className="flex justify-between w-full ">
              <div>
                {consultationStatus.isNewConfirm && <div className="w-1 h-1 rounded-xl bg-status-alert"></div>}
                <span>예약확정</span>
              </div>
              <p className="font-bold">{consultationStatus.confirmCount} 건</p>
            </div>
            <div className="flex justify-between w-full ">
              <div>
                {consultationStatus.isNewComplete && <div className="w-1 h-1 rounded-xl bg-status-alert"></div>}
                <span>상담완료</span>
              </div>
              <p className="font-bold">{consultationStatus.completeCount} 건</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-[340px] flex-col justify-between ">
        <Link
          href={`/detail/review/${pbId}`}
          className="w-min-[300px] h-[30] rounded-md border-1 border-primary-normal bg-white py-[14px]  text-center text-sm font-bold  text-primary-normal"
        >
          나의 후기
        </Link>
        <Link
          href="/schedule"
          className="h-[30] w-full rounded-md bg-primary-normal py-[14px] text-center text-sm font-bold text-white "
        >
          일정 관리
        </Link>
      </div>
    </section>
  );
}

export default ConsultationStatus;
