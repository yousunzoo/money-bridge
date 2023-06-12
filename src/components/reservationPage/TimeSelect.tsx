import { ITimeSelectProps } from "@/types/reservation";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const BUTTON_STYLE = "w-[80px] py-1 bg-gray-200 text-center";
function TimeSelect({ selectOptions, selectedDate, handleTimeSelect }: ITimeSelectProps) {
  const { am, pm } = selectOptions;
  const userDate = dayjs(selectedDate).format("YYYY년 MM월 DD일 dddd");
  const [selected, setSelected] = useState<string>(am[0]);

  const handleButtonClick = (time: string) => {
    setSelected(time);
    handleTimeSelect(time);
  };

  useEffect(() => {
    handleTimeSelect(selected);
  }, []);
  return (
    <>
      <p>방문 날짜</p>
      <p>{userDate}</p>
      <div className="mt-10">
        <p className="mb-4">오전</p>
        <div className="mb-10 grid w-full grid-cols-4">
          {am.map(time => (
            <button
              className={`${BUTTON_STYLE} ${selected === time && "!bg-gray-400"}`}
              onClick={() => {
                handleButtonClick(time);
              }}
              key={time}
            >
              {time}
            </button>
          ))}
        </div>
        <p className="mb-4">오후</p>
        <div className="grid w-full grid-cols-4 gap-y-4">
          {pm.map(time => (
            <button
              className={`${BUTTON_STYLE} ${selected === time && "!bg-gray-400"}`}
              onClick={() => {
                handleButtonClick(time);
              }}
              key={time}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default TimeSelect;
