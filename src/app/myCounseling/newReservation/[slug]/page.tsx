"use client";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import TopNav from "@/components/common/TopNav";
import React, { useState } from "react";
import ConsultationScheduleSection from "@/components/common/ConsultationScheduleSection";
import ConsultationLocationSection from "@/components/common/ConsultationLocationSection";
import ConsultationNoteSection from "@/components/common/ConsultationNoteSection";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { redirect, useRouter } from "next/navigation";
import { useUserReservationInfo } from "@/hooks/useGetUserReservationInfo";
import DoubleButton from "@/components/common/DoubleButton";
import ButtonModal from "@/components/common/ButtonModal";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deleteReservation } from "@/app/apis/services/pb";
import ErrorModal from "@/components/common/ErrorModal";

function NewReservationPage({ params: { slug } }: { params: { slug: number } }) {
  const router = useRouter();
  const { userInfo, userLoading, isLogined } = useGetUserInfo();
  const { reservationInfo, reservationLoading, reservationError } = useUserReservationInfo(slug);
  const [isButtonOpen, setIsButtonOpen] = useState(false);

  if (!isLogined && !userLoading) {
    redirect("/");
  }
  const { mutate: cancelMutate } = useMutation<null, AxiosError, number>(deleteReservation, {
    onSuccess: () => {
      router.push(`/myCounseling/canceledConsultation/${slug}`);
    },
  });
  if (reservationInfo === undefined) return null;
  const {
    candidateTime1,
    name,
    phoneNumber,
    candidateTime2,
    type,
    location,
    locationAddress,
    goal,
    question,
    profileImage,
    pbId,
  } = reservationInfo;
  if (!userInfo) return;
  const role = userInfo?.role;
  const formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");

  const cancelClickHandler = () => {
    setIsButtonOpen(true);
  };

  const clickHandler = () => {
    router.back();
  };
  const modalContents = {
    content: "예약을 취소 하시겠습니까?",
    confirmText: "확인",
    cancelText: "취소",
    cancelFn: () => setIsButtonOpen(false),
    confirmFn: () => cancelMutate(slug),
  };
  const scheduleSectionProps = { candidateTime1, candidateTime2, role };
  const locationSectionProps = { type, role, location, locationAddress };
  const noteSectionProps = { role, goal, question };

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
      <TopNav title="신규예약" hasBack={true} />
      <div className="user_top_Phrase mx-[-16px] mt-4 box-content w-full">
        <span className="text-white ">프라이빗 뱅커가 곧 유선으로 연락을 드립니다.</span>
      </div>
      <UserReservationItem buttonName="PB 정보" href={`/detail/info/${pbId}`} isRole={"PB"} profileImage={profileImage}>
        <p className="font-bold">{name}</p>
        <p className="text-xs ">{formattedPhoneNumber}</p>
        <p className="text-xs ">{type === "VISIT" ? "방문상담" : "유선상담"} </p>
      </UserReservationItem>

      <section className="w-full p-4 pb-6 mt-6 text-xs bg-white rounded-md">
        <ConsultationScheduleSection {...scheduleSectionProps} />
        <ConsultationLocationSection {...locationSectionProps} />
        <ConsultationNoteSection {...noteSectionProps} />
        <div className="flex flex-col items-center py-6 text-xs">
          <p className="font-bold text-primary-normal">PB가 유선연락을 통해 일정과 장소를 확인해드립니다.</p>
          <p className="text-primary-normal">(영업일 1일 이내)</p>
        </div>
        <DoubleButton
          firstTitle={"예약 취소"}
          secondTitle={"확인"}
          firstClickFunc={cancelClickHandler}
          secondClickFunc={clickHandler}
          role={"USER"}
        />
        {isButtonOpen && (
          <ButtonModal modalContents={modalContents} isOpen={isButtonOpen} setIsOpen={setIsButtonOpen} />
        )}
      </section>
    </div>
  );
}

export default NewReservationPage;
