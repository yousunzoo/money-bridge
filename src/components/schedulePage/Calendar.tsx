import React, { memo, useCallback, useEffect, useState } from "react";
import type { BadgeProps } from "antd";
import { Badge, Calendar } from "antd";
import type { Dayjs } from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import dayjs from "dayjs";
import { ManagementCalendarProps } from "@/types/schedule";
import "dayjs/locale/ko";
import locale from "antd/es/calendar/locale/ko_KR";

dayjs.locale("ko");

const ManagementCalendar: React.FC<ManagementCalendarProps> = React.memo(function ManagementCalendar({
  reservationList,
  setIsClickDay,
  setClickDate,
}) {
  const [scheduleData, setScheduleData] = useState(reservationList); // 초기 데이터로 상태 초기화
  const [initialDateSelected, setInitialDateSelected] = useState(false); // 초기 날짜 선택 여부를 확인하는 상태, 오늘 날짜 선택

  useEffect(() => {
    if (reservationList === undefined) {
      return; // reservationList가 undefined일 경우, useEffect를 종료하고 이후 로직을 실행하지 않음
    }

    setScheduleData(reservationList);
    if (!initialDateSelected && reservationList.length > 0) {
      const today = dayjs().format("YYYY-MM-DD");
      setIsClickDay(today);
      setInitialDateSelected(true);
    }
  }, [reservationList]);

  const getListData = useCallback(
    (value: Dayjs) => {
      const dateString = value.format("YYYY-MM-DD");
      const filteredData = scheduleData?.filter(item => item.day === dateString);
      if (filteredData !== undefined && filteredData.length > 0) {
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
      }
    },
    [scheduleData],
  );

  const onSelect = (date: Dayjs | null) => {
    if (date) {
      const dateString = date.format("YYYY-MM-DD");
      setIsClickDay(dateString);
    }
  };

  const dateCellRender = useCallback(
    (value: Dayjs) => {
      const listData = getListData(value);
      if (listData === undefined) return;
      const setListData = listData.filter(
        (obj, index, self) => index === self.findIndex(item => item.type === obj.type),
      );
      return (
        setListData.length && (
          <ul className="events">
            {setListData.map((item, index) => (
              <li key={index}>
                <Badge status={item.type as BadgeProps["status"]} />
              </li>
            ))}
          </ul>
        )
      );
    },
    [scheduleData],
  );

  const disabledDate = (current: Dayjs) => {
    const listData = getListData(current);
    if (listData === undefined || listData.length === 0) return true;
    return false;
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
});

export default ManagementCalendar;
