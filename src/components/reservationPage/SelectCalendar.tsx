import React from "react";
import "@/styles/selectCalendar.css";
import { Calendar } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import locale from "antd/es/calendar/locale/ko_KR";

import { theme } from "antd";
import { SelectCalendarProps } from "@/types/reservation";

dayjs.locale("ko");

function SelectCalendar({ handleSelect }: SelectCalendarProps) {
  const { token } = theme.useToken();
  const disabledDate = (date: dayjs.Dayjs) => {
    const now = dayjs().endOf("d").valueOf();
    if (date.endOf("d").valueOf() < now || !isWeekday(date)) {
      return true;
    }
    return false;
  };

  const isWeekday = (date: dayjs.Dayjs) => {
    return date.day() !== 0 && date.day() !== 6;
  };

  const dateCellRender = (date: dayjs.Dayjs) => {
    if (!isWeekday(date)) {
      return null;
    }
  };
  return (
    <Calendar
      locale={locale}
      cellRender={dateCellRender}
      disabledDate={disabledDate}
      fullscreen={false}
      onSelect={handleSelect}
    />
  );
}

export default SelectCalendar;
