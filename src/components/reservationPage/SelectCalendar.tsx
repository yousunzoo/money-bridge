import { useEffect } from "react";
import "@/styles/selectCalendar.css";
import { Calendar } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import locale from "antd/es/calendar/locale/ko_KR";
import { ISelectCalendarProps } from "@/types/reservation";

dayjs.locale("ko");

function SelectCalendar({ handleSelect, setIsDisabled }: ISelectCalendarProps) {
  const isWeekday = (date: dayjs.Dayjs) => {
    return date.day() !== 0 && date.day() !== 6;
  };

  const disabledDate = (date: dayjs.Dayjs) => {
    const now = dayjs().endOf("d").valueOf();
    if (date.endOf("d").valueOf() < now || !isWeekday(date)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setIsDisabled(true);
  }, []);

  return <Calendar locale={locale} disabledDate={disabledDate} fullscreen={false} onSelect={handleSelect} />;
}

export default SelectCalendar;
