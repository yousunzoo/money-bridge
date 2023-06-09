import React from "react";
import "@/styles/selectCalendar.css";
import { Calendar } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

function SelectCalendar({ handleSelect }) {
  const disabledDate = (date: dayjs.Dayjs) => {
    const now = dayjs().endOf("d").valueOf();
    if (date.endOf("d").valueOf() < now) {
      return true;
    }
    return false;
  };

  return <Calendar disabledDate={disabledDate} fullscreen={false} onSelect={handleSelect} />;
}

export default SelectCalendar;
