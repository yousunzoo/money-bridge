"use client";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import TopNav from "@/components/common/TopNav";
import React from "react";
import res from "../../../../mocks/kjun/managementReservations.json";
import ConsultationLocationSection from "@/components/common/ConsultationLocationSection";
import ConsultationScheduleSection from "@/components/common/ConsultationScheduleSection";
import ConsultationNoteSection from "@/components/common/ConsultationNoteSection";
import SingleButton from "@/components/common/SingleButton";

interface Props {
  params: {
    slug: string;
  };
}

interface ReservationData {
  pbId: number;
  profileImage: string;
  name: string;
  phoneNumber: string;
  reservationId: number;
  candidateTime1: string;
  candidateTime2: string;
  time: string;
  location: string;
  locationAddress: string;
  goal: string;
  question: string;
  type: string;
}

function CanceledConsultationPage({ params }: Props) {
  const {
    pbId,
    profileImage,
    name,
    phoneNumber,
    reservationId,
    candidateTime1,
    candidateTime2,
    time,
    location,
    locationAddress,
    goal,
    question,
    type,
    reviewCheck,
  } = res.data.reservationList[0];
  // profileImage데이터는 api등록 후 UserReservationItem props 내려주고 코드 변경하기
  const role = "PB";

  const checkClickHandler = () => {
    console.log("확인");
  };
  // 데이터 time 유무에 따라 상담일정, 희망일정 다르게
  const historyCard = {
    candidateTime1,
    candidateTime2,
    type,
    time,
    location,
    locationAddress,
    goal,
    question,
    role,
    reviewCheck,
  };
  const scheduleSectionProps = { candidateTime1, candidateTime2, role, time };
  const locationSectionProps = { type, role, location, locationAddress };
  const noteSectionProps = { role, goal, question };

  return (
    <div>
      <TopNav title="취소된 상담" hasBack={true} />
      <div className="pb_top_Phrase">
        <span className="text-white ">취소된 상담입니다.</span>
      </div>

      <UserReservationItem buttonName="고객 정보" href={"/"} isRole={"USER"}>
        <p className="font-bold">{name}</p>
        <p className="text-xs ">{"취소된 상담"}</p>
      </UserReservationItem>

      <section className="mt-6 w-full rounded-md bg-white p-4 pb-6 text-xs">
        <ConsultationScheduleSection {...scheduleSectionProps} />
        <ConsultationLocationSection {...locationSectionProps} />
        <ConsultationNoteSection {...noteSectionProps} />
      </section>
      <SingleButton title={"확인"} role={role} ClickFunc={checkClickHandler} />
    </div>
  );
}

export default CanceledConsultationPage;
