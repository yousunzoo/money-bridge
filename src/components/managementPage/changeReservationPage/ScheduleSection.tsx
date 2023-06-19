import { ScheduleSectionProps } from "@/types/management";
import React from "react";

function ScheduleSection({
  candidateTime1,
  candidateTime2,
  isSelectSchedule,
  selectTimeHandler,
}: ScheduleSectionProps) {
  return (
    <section className="flex justify-between">
      <h3 className="font-bold">상담 희망 일정</h3>
      <div>
        <div>
          <span className="ml-4 font-bold text-primary-normal">1순위</span>
          <span className="ml-7 text-primary-normal">{candidateTime1}</span>
          <button
            onClick={() => selectTimeHandler(candidateTime1)}
            className={`${
              isSelectSchedule
                ? "border-1 border-primary-normal bg-primary-normal text-white"
                : "border-1 border-primary-normal bg-white text-primary-normal"
            } ml-4 rounded-md bg-primary-normal px-5 py-1 font-bold `}
          >
            선택
          </button>
        </div>
        <div className="mt-2">
          <span className="ml-4 font-bold text-primary-normal">2순위</span>
          <span className="ml-7 text-primary-normal">{candidateTime2}</span>
          <button
            onClick={() => selectTimeHandler(candidateTime2)}
            className={`${
              isSelectSchedule
                ? "border-1 border-primary-normal bg-white text-primary-normal"
                : "border-1 border-primary-normal bg-primary-normal text-white"
            } ml-4 rounded-md bg-primary-normal px-5 py-1 font-bold `}
          >
            선택
          </button>
        </div>
      </div>
    </section>
  );
}

export default ScheduleSection;
