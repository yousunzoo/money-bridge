"use client";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import TopNav from "@/components/common/TopNav";
import React from "react";
import ConsultationLocationSection from "@/components/common/ConsultationLocationSection";
import ConsultationScheduleSection from "@/components/common/ConsultationScheduleSection";
import ConsultationNoteSection from "@/components/common/ConsultationNoteSection";
import DoubleButton from "@/components/common/DoubleButton";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useGetReservationInfo } from "@/hooks/useGetReservationInfo";
import { redirect, useRouter } from "next/navigation";
import ErrorModal from "@/components/common/ErrorModal";
import SingleButton from "@/components/common/SingleButton";

function CompletedConsultationPage({ params: { slug } }: { params: { slug: number } }) {
  const router = useRouter();
  const { userInfo, userLoading, isLogined } = useGetUserInfo();

  if (!isLogined && !userLoading) {
    redirect("/");
  }

  const { reservationInfo, reservationLoading, reservationError } = useGetReservationInfo(slug);

  if (reservationInfo === undefined) return null;
  const { time, name, phoneNumber, type, location, locationAddress, goal, question, profileImage, reviewCheck } =
    reservationInfo;
  if (!userInfo) return;
  const role = userInfo?.role;
  const formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");

  const myReviewClickHandler = () => {
    router.push("/management?process=COMPLETE");
  };
  const checkClickHandler = () => {
    router.push("/management?process=COMPLETE");
  };

  const scheduleSectionProps = { role, time };
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
      <TopNav title="완료된 상담" hasBack={true} />
      <div className="pb_top_Phrase mx-[-16px] mt-4 box-content w-full ">
        <span className="text-white ">상담이 완료되었습니다.</span>
      </div>
      <UserReservationItem
        buttonName="고객 정보"
        href={`tel:${formattedPhoneNumber}`}
        isRole={"USER"}
        profileImage={profileImage}
      >
        <p className="font-bold">{name}</p>
        <p className="text-xs ">{formattedPhoneNumber}</p>
        <p className="text-xs ">{type === "VISIT" ? "방문상담" : "유선상담"} </p>
      </UserReservationItem>
      <section className="mt-6 w-full rounded-md bg-white p-4 pb-6 text-xs">
        <ConsultationScheduleSection {...scheduleSectionProps} />
        <ConsultationLocationSection {...locationSectionProps} />
        <ConsultationNoteSection {...noteSectionProps} />
        <div className="flex flex-col items-center pt-6 text-xs">
          <p className="font-bold text-primary-normal">상담이 완료되었습니다.</p>
        </div>
        {reviewCheck ? (
          <>
            <DoubleButton
              firstTitle={"후기 보러 가기"}
              secondTitle={"확인"}
              firstClickFunc={myReviewClickHandler}
              secondClickFunc={checkClickHandler}
              role={"PB"}
              reviewCheck={reviewCheck}
            />
            <SingleButton title={"확인"} role={role} ClickFunc={checkClickHandler} />
          </>
        ) : (
          <SingleButton title={"확인"} role={role} ClickFunc={checkClickHandler} />
        )}
      </section>
    </div>
  );
}

export default CompletedConsultationPage;
