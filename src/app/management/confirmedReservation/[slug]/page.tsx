"use client";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import TopNav from "@/components/common/TopNav";
import React from "react";
import res from "../../../../mocks/kjun/managementReservations.json";
import ConsultationLocationSection from "@/components/common/ConsultationLocationSection";
import ConsultationScheduleSection from "@/components/common/ConsultationScheduleSection";
import ConsultationNoteSection from "@/components/common/ConsultationNoteSection";
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

function ConfirmedReservationPage({ params }: Props) {
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

  const undoChangeClickHandler = () => {
    console.log("변경/취소");
  };
  const completedClickHandler = () => {
    console.log("상담완료");
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
      <TopNav title="확정된 상담" hasBack={true} />
      <div className="pb_top_Phrase">
        <span className="text-white ">상담이 확정되었습니다. 상담 일정을 확인해 주세요.</span>
      </div>
      <UserReservationItem buttonName={"고객 정보"} href={"/"} isRole={"USER"}>
        <p className="font-bold">{name}</p>
        <p className="text-xs ">{phoneNumber}</p>
        <p className="text-xs ">{type === "VISIT" ? "방문상담" : "유선상담"} </p>
      </UserReservationItem>
      <section className="mt-6 w-full rounded-md bg-white p-4 pb-6 text-xs">
        <ConsultationScheduleSection {...scheduleSectionProps} />
        <ConsultationLocationSection {...locationSectionProps} />
        <ConsultationNoteSection {...noteSectionProps} />
        <div className="flex flex-col items-center pt-6 text-xs">
          <p className="font-bold text-primary-normal">싱담이 끝난 후 아래의 상담완료 버튼을 누르시면</p>
          <p className="text-primary-normal">투자자에게 상담완료 및 후기작성 알림이 전송됩니다.</p>
        </div>
        <DoubleButton
          firstTitle={"변경/취소"}
          secondTitle={"상담 완료"}
          firstClickFunc={undoChangeClickHandler}
          secondClickFunc={completedClickHandler}
          role={"PB"}
        />
      </section>
    </div>
  );
}

export default ConfirmedReservationPage;
