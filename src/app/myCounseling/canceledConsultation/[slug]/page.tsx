"use client";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import TopNav from "@/components/common/TopNav";
import React from "react";
import res from "../../../../mocks/kjun/managementReservations.json";
import ConsultingHistoryCard from "../../../../components/common/ConsultingHistoryCard";
import DoubleButton from "@/components/common/DoubleButton";
import ConsultationScheduleSection from "@/components/common/ConsultationScheduleSection";
import ConsultationLocationSection from "@/components/common/ConsultationLocationSection";
import ConsultationNoteSection from "@/components/common/ConsultationNoteSection";

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
  const role: string = "USER";
  const completionPhrase1 = "";
  const completionPhrase2 = "";

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
    completionPhrase1,
    completionPhrase2,
  };

  const scheduleSectionProps = { candidateTime1, candidateTime2, role, time };
  const locationSectionProps = { type, role, location, locationAddress };
  const noteSectionProps = { role, goal, question };

  const consultationRequestHandler = () => {
    console.log("상담 다시 신청하기");
  };

  const checkClickHandler = () => {
    console.log("확인");
  };

  return (
    <div>
      <TopNav title="취소된 상담" hasBack={true} />
      <div className="user_top_Phrase">
        <span className="text-white ">취소된 상담입니다.</span>
      </div>
      <UserReservationItem buttonName="PB 정보" href={"/"} isRole={"pb"}>
        <p className="font-bold">{name} PB</p>
        <p className="text-xs ">{"취소된 상담"}</p>
      </UserReservationItem>

      <section className="mt-6 w-full rounded-md bg-white p-4 pb-6 text-xs">
        <ConsultationScheduleSection {...scheduleSectionProps} />
        <ConsultationLocationSection {...locationSectionProps} />
        <ConsultationNoteSection {...noteSectionProps} />
        <DoubleButton
          reviewCheck={reviewCheck}
          firstTitle={"상담 다시 신청하기"}
          secondTitle={"확인"}
          firstClickFunc={consultationRequestHandler}
          secondClickFunc={checkClickHandler}
          role={"USER"}
        />
      </section>
    </div>
  );
}

export default CanceledConsultationPage;
