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
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useUserReservationInfo } from "@/hooks/useGetUserReservationInfo";
import { redirect, useRouter } from "next/navigation";
import ErrorModal from "@/components/common/ErrorModal";

function CanceledConsultationPage({ params: { slug } }: { params: { slug: number } }) {
  const router = useRouter();
  const { userInfo, userLoading, isLogined } = useGetUserInfo();
  const { reservationInfo, reservationLoading, reservationError } = useUserReservationInfo(slug);

  if (!isLogined && !userLoading) {
    redirect("/");
  }

  if (reservationInfo === undefined) return null;
  const {
    reservationId,
    candidateTime1,
    candidateTime2,
    time,
    name,
    pbId,
    type,
    location,
    locationAddress,
    goal,
    question,
    profileImage,
    reviewCheck,
  } = reservationInfo;
  if (!userInfo) return;
  const role = userInfo?.role;

  const scheduleSectionProps = { candidateTime1, candidateTime2, role, time };
  const locationSectionProps = { type, role, location, locationAddress };
  const noteSectionProps = { role, goal, question };

  const consultationRequestHandler = () => {
    router.push(`/reservation?pbId=${pbId}`);
  };

  const checkClickHandler = () => {
    router.push("/myCounseling?process=WITHDRAW");
  };

  if (userInfo?.role !== "USER")
    return (
      <ErrorModal isError={true} path={"/myCounseling?process=APPLY"} content={"권한이 없습니다. 다시 시도해주세요."} />
    );
  if (reservationError)
    return (
      <ErrorModal
        isError={true}
        path={"/myCounseling?process=APPLY"}
        content={"일시적인 문제가 발생했습니다. 다시 시도해주세요."}
      />
    );
  return (
    <div>
      <TopNav title="취소된 상담" hasBack={true} path={"/myCounseling?process=WITHDRAW"} />
      <div className="user_top_Phrase  mx-[-16px] mt-4 box-content w-full ">
        <span className="text-white ">취소된 상담입니다.</span>
      </div>
      <UserReservationItem buttonName="PB 정보" href={`/detail/info/${pbId}`} isRole={"pb"} profileImage={profileImage}>
        <p className="font-bold">{name} PB</p>
        <p className="text-xs ">{"취소된 상담"}</p>
      </UserReservationItem>

      <section className="w-full p-4 pb-6 mt-6 text-xs bg-white rounded-md">
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
