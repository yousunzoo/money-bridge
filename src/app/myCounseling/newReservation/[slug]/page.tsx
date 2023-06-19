"use client";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import TopNav from "@/components/common/TopNav";
import React from "react";
import res from "../../../../mocks/kjun/managementReservations.json";
import ConsultingHistoryCard from "../../../../components/common/ConsultingHistoryCard";
import SingleButton from "@/components/common/SingleButton";
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

function NewReservationPage({ params }: Props) {
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
  } = res.data.reservationList[0];
  // profileImage데이터는 api등록 후 UserReservationItem props 내려주고 코드 변경하기
  const role = "USER";
  const completionPhrase1 = "PB가 유선연락을 통해 일정과 장소를 확인해드립니다.";
  const completionPhrase2 = "(영업일 1일 이내)";
  const onClickhandler = () => {
    console.log("click");
  };

  const historyCard = {
    candidateTime1,
    candidateTime2,
    type,
    location,
    locationAddress,
    goal,
    question,
    role,
    completionPhrase1,
    completionPhrase2,
  };
  const undoChangeClickHandler = () => {
    console.log("변경/취소");
  };

  const scheduleSectionProps = { candidateTime1, candidateTime2, role };
  const locationSectionProps = { type, role, location, locationAddress };
  const noteSectionProps = { role, goal, question };

  return (
    <div>
      <TopNav title="신규예약" hasBack={true} />
      <div className="user_top_Phrase mt-4">
        <span className="text-white ">프라이빗 뱅커가 곧 유선으로 연락을 드립니다.</span>
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
        <div className="flex flex-col items-center py-6 text-xs">
          <p className="font-bold text-primary-normal">PB가 유선연락을 통해 일정과 장소를 확인해드립니다.</p>
          <p className="text-primary-normal">(영업일 1일 이내)</p>
        </div>
        <SingleButton title={"예약 변경/취소"} role={"USER"} ClickFunc={undoChangeClickHandler} />
      </section>
    </div>
  );
}

export default NewReservationPage;
