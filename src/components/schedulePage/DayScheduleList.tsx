import { DayScheduleListProps } from "@/types/schedule";
import dayjs from "dayjs";
import React from "react";

const statusItems = [
  { id: 1, color: "bg-[#EB5147]", text: "APPLY" },
  { id: 2, color: "bg-[#3A7391]", text: "CONFIRM" },
  { id: 3, color: "bg-[#153445]", text: "COMPLETE" },
];

const SCHEDULE_PROCESS: { [key: string]: string } = {
  APPLY: "신규예약",
  CONFIRM: "예약확정",
  COMPLETE: "상담완료",
};
const SCHEDULE_TYPE: { [key: string]: string } = {
  VISIT: "방문상담",
  CALL: "유선상담",
};

function DayScheduleList({ clickDayList, isClickDay }: { clickDayList?: DayScheduleListProps[]; isClickDay: string }) {
  const formattedDate = dayjs(isClickDay).format("MM. DD");

  return (
    <div className="mt-6 h-[220px] w-full overflow-hidden rounded-xl bg-white px-6 py-4 shadow-2xl ">
      <div className="flex justify-between pb-2 text-lg font-bold border-b-2">
        <h3 className="text-lg font-bold">{formattedDate}</h3>
        <span>상담 {clickDayList ? clickDayList.length : 0}건</span>
      </div>
      <ul className="mt-2 h-[150px] w-full gap-2 overflow-y-auto pb-2 pt-1">
        {clickDayList?.length ? (
          clickDayList.map(({ id, userName, day, time, type, process }, index) => {
            const formattedTime = dayjs(`${day} ${time}`).format("A hh:mm");
            const displayTime = formattedTime.includes("AM")
              ? formattedTime.replace("AM", "오전")
              : formattedTime.replace("PM", "오후");

            const processColor = statusItems.find(item => item.text === process);
            return (
              <li key={id} className="flex items-center justify-between w-full h-12 py-1 text-sm ">
                <span>{index + 1}</span>
                <span>{userName}</span>
                <span>{displayTime}</span>
                <span>{SCHEDULE_TYPE[type]}</span>
                <span
                  className={`rounded-lg px-3 py-2 text-xs font-bold ${processColor && processColor.color} text-white`}
                >
                  {SCHEDULE_PROCESS[process]}
                </span>
              </li>
            );
          })
        ) : (
          <div>예약된 상담이 없습니다.</div>
        )}
      </ul>
    </div>
  );
}

export default DayScheduleList;
