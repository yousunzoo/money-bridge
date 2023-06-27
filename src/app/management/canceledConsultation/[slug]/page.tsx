"use client";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import TopNav from "@/components/common/TopNav";
import React from "react";
import ConsultationLocationSection from "@/components/common/ConsultationLocationSection";
import ConsultationScheduleSection from "@/components/common/ConsultationScheduleSection";
import ConsultationNoteSection from "@/components/common/ConsultationNoteSection";
import SingleButton from "@/components/common/SingleButton";
import { redirect, useRouter } from "next/navigation";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useGetReservationInfo } from "@/hooks/useGetReservationInfo";
import ErrorModal from "@/components/common/ErrorModal";

function CanceledConsultationPage({ params: { slug } }: { params: { slug: number } }) {
  const router = useRouter();
  const { userInfo, userLoading, isLogined } = useGetUserInfo();

  if (!isLogined && !userLoading) {
    redirect("/");
  }

  const { reservationInfo, reservationLoading, reservationError } = useGetReservationInfo(slug);

  if (reservationInfo === undefined) return null;
  const {
    candidateTime1,
    candidateTime2,
    name,
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

  const checkClickHandler = () => {
    router.push("/management?process=WITHDRAW");
  };

  const scheduleSectionProps = {
    candidateTime1,
    candidateTime2,
    role,
  };
  const locationSectionProps = { type, role, location, locationAddress };
  const noteSectionProps = { role, goal, question };

  if (userInfo?.role !== "PB")
    return (
      <ErrorModal isError={true} path={"/management?process=APPLY"} content={"권한이 없습니다. 다시 시도해주세요."} />
    );

  if (reservationError)
    return (
      <ErrorModal
        isError={true}
        path={"/management?process=APPLY"}
        content={"일시적인 문제가 발생했습니다. 다시 시도해주세요."}
      />
    );
  return (
    <div>
      <TopNav title="취소된 상담" hasBack={true} />
      <div className="pb_top_Phrase mx-[-16px] mt-4 box-content w-full ">
        <span className="text-white ">취소된 상담입니다.</span>
      </div>

      <UserReservationItem buttonName="고객 정보" href={"/"} isRole={"USER"} profileImage={profileImage}>
        <p className="font-bold">{name}</p>
        <p className="text-xs ">취소된 상담</p>
      </UserReservationItem>

      <section className="w-full p-4 pb-6 mt-6 text-xs bg-white rounded-md">
        <ConsultationScheduleSection {...scheduleSectionProps} />
        <ConsultationLocationSection {...locationSectionProps} />
        <ConsultationNoteSection {...noteSectionProps} />
      </section>
      <SingleButton title={"확인"} role={role} ClickFunc={checkClickHandler} />
    </div>
  );
}

export default CanceledConsultationPage;
