import { ScheduleSectionProps } from "@/types/management";

function ScheduleSection({
  candidateTime1,
  candidateTime2,
  isSelectSchedule,
  selectTimeHandler,
}: ScheduleSectionProps) {
  return (
    <section className="flex justify-between">
      <h3 className="min-w-[80px] font-bold">상담 희망 일정</h3>
      <div>
        <div className="flex flex-col">
          <div>
            <span className="ml-4 font-bold text-primary-normal">1순위</span>
            <span className="ml-7 text-primary-normal">{candidateTime1}</span>
          </div>
          <button
            onClick={() => selectTimeHandler(candidateTime1)}
            className={`${
              isSelectSchedule
                ? "border-1 border-primary-normal bg-primary-normal text-white"
                : "border-1 border-primary-normal bg-white text-primary-normal"
            } flex w-[150px] items-center justify-center self-end rounded-md py-0.5 `}
          >
            선택
          </button>
        </div>
        <div className="mt-2 flex flex-col">
          <div>
            <span className="ml-4 font-bold text-primary-normal">2순위</span>
            <span className="ml-7 text-primary-normal">{candidateTime2}</span>
          </div>
          <button
            onClick={() => selectTimeHandler(candidateTime2)}
            className={`${
              isSelectSchedule
                ? "border-1 border-primary-normal bg-white text-primary-normal"
                : "border-1 border-primary-normal bg-primary-normal text-white"
            } flex w-[150px] items-center justify-center self-end rounded-md py-0.5 `}
          >
            선택
          </button>
        </div>
      </div>
    </section>
  );
}

export default ScheduleSection;
