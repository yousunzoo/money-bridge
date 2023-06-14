import { DayScheduleListProps } from "@/types/schedule";
import dayjs from "dayjs";
import React from "react";

const statusItems = [
  { id: 1, color: "bg-[#EB5147]", text: "신규예약" },
  { id: 2, color: "bg-[#3A7391]", text: "예약확정" },
  { id: 3, color: "bg-[#153445]", text: "상담완료" },
];

function DayScheduleList({ clickDayList, isClickDay }: { clickDayList: DayScheduleListProps[]; isClickDay: string }) {
  const formattedDate = dayjs(isClickDay).format("MM. DD");

  return (
    <div className="h-[220px] w-[360px] overflow-hidden rounded-xl bg-white px-6 py-4 shadow-2xl ">
      <div className="flex justify-between border-b-2 pb-2 text-lg font-bold">
        <h3 className="text-lg font-bold">{formattedDate}</h3>
        <span>상담 {clickDayList ? clickDayList.length : 0}건</span>
      </div>
      <ul className="h-[150px] w-full overflow-y-auto pb-2 pt-1 ">
        {clickDayList.length ? (
          clickDayList.map(({ id, userName, day, time, type, process }, index) => {
            const formattedTime = dayjs(`${day} ${time}`).format("A hh:mm");
            const displayTime = formattedTime.includes("AM")
              ? formattedTime.replace("AM", "오전")
              : formattedTime.replace("PM", "오후");

            const processColor = statusItems.find(item => item.text === process);
            return (
              <li key={id} className="flex w-full items-center justify-between py-1 text-sm ">
                <span>{index + 1}</span>
                <span>{userName}</span>
                <span>{displayTime}</span>
                <span>{type}</span>
                <span
                  className={`rounded-lg px-2 py-1 text-xs font-bold bg-[${
                    processColor && processColor.color
                  }] text-white`}
                >
                  {process}
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
