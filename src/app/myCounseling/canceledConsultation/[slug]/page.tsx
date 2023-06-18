"use client";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import TopNav from "@/components/common/TopNav";
import React from "react";
import res from "../../../../mocks/kjun/managementReservations.json";
import ConsultingHistoryCard from "../../../../components/common/ConsultingHistoryCard";
import DoubleButton from "@/components/consultationPage/DoubleButton";

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
    reviewCheck,
    completionPhrase1,
    completionPhrase2,
  };

  return (
    <div>
      <TopNav title="취소된 상담" hasBack={true} />
      <div className={role === "USER" ? "user_top_Phrase" : "pb_top_Phrase"}>
        <span className="text-white ">취소된 상담입니다.</span>
      </div>
      <UserReservationItem buttonName="PB 정보" onClickhandler={onClickhandler} isRole={"pb"}>
        <p className="font-bold">{name} PB</p>
        <p className="text-xs ">{"취소된 상담"}</p>
      </UserReservationItem>

      <ConsultingHistoryCard {...historyCard} />
      <DoubleButton
        reviewCheck={reviewCheck}
        firstTitle={"상담 다시 신청하기"}
        secondTitle={"후기 작성"}
        firstClickFunc={onClickhandler}
        secondClickFunc={onClickhandler}
        role={"USER"}
      />
    </div>
  );
}

export default CanceledConsultationPage;
