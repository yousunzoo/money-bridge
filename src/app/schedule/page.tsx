"use client";

import TopNav from "@/components/common/TopNav";
import reviewMockData from "../../mocks/kjun/calendarData.json";
import consultTime from "../../mocks/kjun/consultTime.json";
import { useState } from "react";
import ManagementCalendar from "./Calendar";
import "@/styles/calendar.css";
import question from "/public/assets/images/question_mark.svg";
import Image from "next/image";
import InfoModal from "./InfoModal";
import DayScheduleList from "./DayScheduleList";
import ConsultationTimeCard from "./ConsultationTimeCard";
const data = reviewMockData.data.reservationList;
const counltTime = consultTime.data;

function SchedulePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClickDay, setIsClickDay] = useState("");

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };
  const clickDayList = data.filter(item => item.day === isClickDay);
  return (
    <div className="relative flex flex-col items-center">
      <Image
        className="absolute right-14 top-10 z-10 cursor-pointer "
        src={question}
        alt={question}
        width={20}
        height={20}
        onClick={onClickHandler}
      />
      {isOpen && <InfoModal />}
      <TopNav title={"일정관리"} hasBack={true}></TopNav>
      <ManagementCalendar reservationList={data} setIsClickDay={setIsClickDay} />
      <DayScheduleList clickDayList={clickDayList} isClickDay={isClickDay} />
      <ConsultationTimeCard {...counltTime} />
    </div>
  );
}

export default SchedulePage;
