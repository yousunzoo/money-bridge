"use client";
import React, { useEffect, useState } from "react";
import type { BadgeProps } from "antd";
import { Badge, Calendar } from "antd";
import type { Dayjs } from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import dayjs from "dayjs";
import { ManagementCalendarProps } from "@/types/schedule";
import "dayjs/locale/ko";
import locale from "antd/es/calendar/locale/ko_KR";

dayjs.locale("ko");

const ManagementCalendar: React.FC<ManagementCalendarProps> = ({ reservationList, setIsClickDay, setClickDate }) => {
  const [scheduleData, setScheduleData] = useState(reservationList || undefined); // 초기 데이터로 상태 초기화
  const [initialDateSelected, setInitialDateSelected] = useState(false); // 초기 날짜 선택 여부를 확인하는 상태, 오늘 날짜 선택

  useEffect(() => {
    setScheduleData(reservationList!);
    if (reservationList !== undefined) {
      if (!initialDateSelected && reservationList.length > 0) {
        const today = dayjs().format("YYYY-MM-DD");
        setIsClickDay(today);
        setInitialDateSelected(true);
      }
    }
  }, []);

  const getListData = (value: Dayjs) => {
    const dateString = value.format("YYYY-MM-DD");
    const filteredData = scheduleData?.filter(item => item.day === dateString);

    // 데이터에 따라 스케줄 상태를 반환
    const listData = filteredData?.map(item => {
      let status: BadgeProps["status"] = "default";

      switch (item.process) {
        case "COMPLETE":
          status = "success";
          break;
        case "CONFIRM":
          status = "warning";
          break;
        case "APPLY":
          status = "error";
          break;
      }

      return { type: status };
    });

    return listData;
  };

  const onSelect = (date: Dayjs | null) => {
    if (date) {
      const dateString = date.format("YYYY-MM-DD");
      setIsClickDay(dateString);
    }
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);

    const setListData = listData?.filter(
      (obj, index, self) => index === self.findIndex(item => item.type === obj.type),
    );
    return setListData?.length ? (
      <ul className="events">
        {setListData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type as BadgeProps["status"]} />
          </li>
        ))}
      </ul>
    ) : null;
  };

  const disabledDate = (current: Dayjs) => {
    const listData = getListData(current);
    return listData?.length === 0;
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  const handlePanelChange = (value: Dayjs, mode: string) => {
    if (mode === "year" || mode === "month") {
      const year = value.year();
      const month = value.month() + 1;
      setClickDate({
        year: year,
        month: month,
      });
    }
  };

  return (
    <Calendar
      locale={locale}
      cellRender={cellRender}
      onSelect={onSelect}
      disabledDate={disabledDate}
      onPanelChange={handlePanelChange}
    />
  );
};

export default ManagementCalendar;
