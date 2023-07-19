import { ITimeSelectProps } from "@/types/reservation";
import { timeSelectOptions } from "@/utils/timeSelectOptions";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const BUTTON_STYLE = "h-10 text-bold text-sm px-4 bg-gray-200 rounded-sm text-center border-1 border-primary-normal";
function TimeSelect({ setIsDisabled, selectOptions, selectedDate, handleTimeSelect }: ITimeSelectProps) {
  const { am, pm } = selectOptions;
  const userDate = dayjs(selectedDate).format("YYYY년 MM월 DD일 dddd");
  const selectedDay = dayjs(selectedDate).get("D");
  const nowDay = dayjs().get("D");
  const nowTime = dayjs().get("h");
  const isToday = selectedDay === nowDay ? true : false;
  const disabledOptions = timeSelectOptions({
    consultStart: am[0],
    consultEnd: String(nowTime),
  });

  const [selected, setSelected] = useState<string | null>();

  const handleButtonClick = (time: string) => {
    setSelected(time);
    handleTimeSelect(time);
  };

  useEffect(() => {
    if (selected) {
      setIsDisabled(false);
      return;
    }
    setIsDisabled(true);
  }, [selected]);

  return (
    <>
      <p className="font-bold">방문 날짜</p>
      <p className="fond-bold">{userDate}</p>
      <div className="mt-8">
        <p className="mb-4 text-sm">오전</p>
        <div className="mb-8 grid w-full grid-cols-4 gap-x-2">
          {am.map(time => (
            <button
              className={`${BUTTON_STYLE} ${isToday && disabledOptions.am.includes(time) && "inactive"} ${
                selected === time && "selected"
              }`}
              onClick={() => {
                handleButtonClick(time);
              }}
              disabled={isToday && disabledOptions.am.includes(time)}
              key={time}
            >
              {time}
            </button>
          ))}
        </div>
        <p className="mb-4 text-sm">오후</p>
        <div className="grid w-full grid-cols-4 gap-2">
          {pm.map(time => (
            <button
              className={`${BUTTON_STYLE} ${isToday && disabledOptions.pm.includes(time) && "inactive"} ${
                selected === time && "selected"
              }`}
              onClick={() => {
                handleButtonClick(time);
              }}
              disabled={isToday && disabledOptions.pm.includes(time)}
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
