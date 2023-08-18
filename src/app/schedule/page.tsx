"use client";
import { useState } from "react";
import ManagementCalendar from "../../components/schedulePage/Calendar";
import "@/styles/calendar.css";
import question from "/public/assets/images/question_mark.svg";
import Image from "next/image";
import InfoModal from "@/components/schedulePage/InfoModal";
import DayScheduleList from "@/components/schedulePage/DayScheduleList";
import ConsultationTimeCard from "@/components/schedulePage/ConsultationTimeCard";
import { useQuery } from "@tanstack/react-query";
import { getConsultTime, getScheduleInfo } from "../apis/services/pb";
import { AxiosError } from "axios";
import { ConsultationTimeCardProps, DayScheduleListProps } from "@/types/schedule";
import dayjs from "dayjs";
import ErrorModal from "@/components/common/ErrorModal";
import { redirect } from "next/navigation";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";

export const revalidate = 0;

function SchedulePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickDay, setClickDay] = useState("");
  const [clickDate, setClickDate] = useState({
    year: dayjs().year(),
    month: dayjs().month() + 1,
  });
  const { userInfo, userLoading, isLogined } = useGetUserInfo();

  if (!isLogined && !userLoading) {
    redirect("/");
  }

  const {
    data: schedule,
    isError: scheduleError,
    isLoading: scheduleLoading,
  } = useQuery<DayScheduleListProps[], AxiosError>(["pbSchedlue", clickDay], () =>
    getScheduleInfo({
      year: clickDate.year,
      month: clickDate.month,
    }),
  );
  const {
    data: consultTime,
    isError: consultError,
    isLoading,
  } = useQuery<ConsultationTimeCardProps, AxiosError>(["consultTime"], getConsultTime);

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };

  const clickDayList = schedule?.filter(item => item.day === clickDay);

  if (userInfo?.role !== "PB")
    return <ErrorModal isError={true} path={"/"} content={"권한이 없습니다. 다시 시도해주세요."} />;
  if (scheduleError || consultError)
    return <ErrorModal isError={true} path={"/"} content={"일시적인 문제가 발생했습니다. 다시 시도해주세요."} />;
  return (
    <div className="relative flex flex-col items-center">
      <Image
        className="absolute z-10 cursor-pointer right-7 top-6 "
        src={question}
        alt={question}
        width={20}
        height={20}
        onClick={onClickHandler}
      />
      {isOpen && <InfoModal />}
      <ManagementCalendar reservationList={schedule} setIsClickDay={setClickDay} setClickDate={setClickDate} />
      <DayScheduleList clickDayList={clickDayList} isClickDay={clickDay} />
      <ConsultationTimeCard
        consultStart={consultTime?.consultStart}
        consultEnd={consultTime?.consultEnd}
        consultNotice={consultTime?.consultNotice}
      />
    </div>
  );
}

export default SchedulePage;
