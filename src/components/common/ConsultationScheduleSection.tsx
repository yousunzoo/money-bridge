import React from "react";
interface ConsultationScheduleSectionProps {
  candidateTime1: string;
  candidateTime2: string;
  role: string;
  time?: string;
}
function ConsultationScheduleSection({ candidateTime1, candidateTime2, role, time }: ConsultationScheduleSectionProps) {
  return (
    <section className="flex justify-between pb-4 mb-4 border-b-1">
      {time ? (
        <>
          <h3 className="font-bold">상담 일정</h3>
          <div>
            <span
              className={role === "USER" ? `ml-7 font-bold text-secondary-heavy` : `ml-7 font-bold text-primary-normal`}
            >
              {time}
            </span>
          </div>
        </>
      ) : (
        <>
          <h3 className="font-bold">상담 희망 일정</h3>
          <div>
            <div>
              <span
                className={
                  role === "USER" ? `ml-7 font-bold text-secondary-heavy` : `ml-7 font-bold text-primary-normal`
                }
              >
                1순위
              </span>
              <span className={role === "USER" ? `ml-7 text-secondary-heavy` : `ml-7 text-primary-normal`}>
                {candidateTime1}
              </span>
            </div>
            <div className="mt-2">
              <span
                className={
                  role === "USER" ? `ml-7 font-bold text-secondary-heavy` : `ml-7 font-bold text-primary-normal`
                }
              >
                2순위
              </span>
              <span className={role === "USER" ? `ml-7 text-secondary-heavy` : `ml-7 text-primary-normal`}>
                {candidateTime2}
              </span>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default ConsultationScheduleSection;
