"use client";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import TopNav from "@/components/common/TopNav";
import React from "react";
import res from "../../../../mocks/kjun/managementReservations.json";
import ConsultationNoteSection from "@/components/common/ConsultationNoteSection";
import ConsultationLocationSection from "@/components/common/ConsultationLocationSection";
import ConsultationScheduleSection from "@/components/common/ConsultationScheduleSection";
import DoubleButton from "@/components/common/DoubleButton";

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

function CompletedConsultationPage({ params }: Props) {
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
  const role = "USER";
  const completionPhrase1 = "상담이 완료되었습니다.";
  const completionPhrase2 = "상담 후기를 작성해주세요.";
  const onClickhandler = () => {
    console.log("click");
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
    reviewCheck: false,
    completionPhrase1,
    completionPhrase2,
  };
  const scheduleSectionProps = { candidateTime1, candidateTime2, role, time };
  const locationSectionProps = { type, role, location, locationAddress };
  const noteSectionProps = { role, goal, question };

  return (
    <div>
      <TopNav title="완료된 상담" hasBack={true} />
      <div className="user_top_Phrase mt-4">
        <span className="text-white ">상담이 완료되었습니다.</span>
      </div>
      <UserReservationItem buttonName="PB 정보" href={"/"} isRole={"PB"}>
        <p className="font-bold">{name}</p>
        <p className="text-xs ">{phoneNumber}</p>
        <p className="text-xs ">{type === "VISIT" ? "방문상담" : "유선상담"} </p>
      </UserReservationItem>

      <section className="mt-6 w-full rounded-md bg-white p-4 pb-6 text-xs">
        <ConsultationScheduleSection {...scheduleSectionProps} />
        <ConsultationLocationSection {...locationSectionProps} />
        <ConsultationNoteSection {...noteSectionProps} />
        <div className="flex flex-col items-center pt-6 text-xs">
          <p className="font-bold text-secondary-heavy">상담이 완료되었습니다.</p>
          <p className="text-secondary-heavy">{reviewCheck && "상담 후기를 작성해주세요."}</p>
        </div>
        <DoubleButton
          reviewCheck={reviewCheck}
          firstTitle={"상담 다시 신청하기"}
          secondTitle={"후기 작성"}
          firstClickFunc={onClickhandler}
          secondClickFunc={onClickhandler}
          role={"USER"}
        />
      </section>
    </div>
  );
}

export default CompletedConsultationPage;
