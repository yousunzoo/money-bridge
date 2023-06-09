import { ITimeSelectProps } from "@/types/reservation";
import React, { MouseEvent } from "react";

const BUTTON_STYLE = "w-[80px] py-1 bg-gray-100 text-center";
function TimeSelect({ selectOptions, selectedDate }: ITimeSelectProps) {
  const { am, pm } = selectOptions;

  const handleClick = (time: string) => {
    console.log(time);
  };
  return (
    <>
      <p>방문 날짜</p>
      <p>{selectedDate}</p>
      <div className="mt-10">
        <p className="mb-4">오전</p>
        <div className="mb-10 grid w-full grid-cols-4">
          {am.map(time => (
            <button
              className={BUTTON_STYLE}
              onClick={() => {
                handleClick(time);
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
              className={BUTTON_STYLE}
              onClick={() => {
                handleClick(time);
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
