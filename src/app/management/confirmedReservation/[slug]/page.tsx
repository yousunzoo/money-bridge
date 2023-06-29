"use client";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import TopNav from "@/components/common/TopNav";
import React, { useState } from "react";
import ConsultationLocationSection from "@/components/common/ConsultationLocationSection";
import ConsultationScheduleSection from "@/components/common/ConsultationScheduleSection";
import ConsultationNoteSection from "@/components/common/ConsultationNoteSection";
import DoubleButton from "@/components/common/DoubleButton";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { redirect, useRouter } from "next/navigation";
import { useGetReservationInfo } from "@/hooks/useGetReservationInfo";
import { completedReservation } from "@/app/apis/services/pb";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ButtonModal from "@/components/common/ButtonModal";
import ErrorModal from "@/components/common/ErrorModal";
import SingleButton from "@/components/common/SingleButton";

function ConfirmedReservationPage({ params: { slug } }: { params: { slug: number } }) {
  const router = useRouter();
  const [isButtonOpen, setIsButtonOpen] = useState(false);

  const { userInfo, userLoading, isLogined } = useGetUserInfo();

  if (!isLogined && !userLoading) {
    redirect("/");
  }

  const { reservationInfo, reservationLoading, reservationError } = useGetReservationInfo(slug);

  const { mutate: completeMutate } = useMutation<null, AxiosError, number>(completedReservation, {
    onSuccess: () => {
      router.push(`/management/completedConsultation/${slug}`);
    },
  });

  if (!userInfo) return;
  const role = userInfo.role;

  if (reservationInfo === undefined) return null;

  const { profileImage, name, phoneNumber, time, location, locationAddress, goal, question, type, reviewCheck } =
    reservationInfo;
  const formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");

  const undoChangeClickHandler = () => {
    router.push(`/management/changeReservation/${slug}`);
  };
  const completedClickHandler = () => {
    setIsButtonOpen(true);
  };
  const modalContents = {
    content: "상담 완료 처리를 하시겠습니까?",
    confirmText: "확인",
    cancelText: "취소",
    cancelFn: () => setIsButtonOpen(false),
    confirmFn: () => completeMutate(slug),
  };
  const checkClickHandler = () => {
    router.push("/management?process=CONFIRM");
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
      <TopNav title="확정된 상담" hasBack={true} />
      <div className="pb_top_Phrase mx-[-16px] mt-4 box-content w-full ">
        <span className="text-white ">상담이 확정되었습니다. 상담 일정을 확인해 주세요.</span>
      </div>
      <UserReservationItem
        buttonName={"고객 정보"}
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
          <p className="font-bold text-primary-normal">싱담이 끝난 후 아래의 상담완료 버튼을 누르시면</p>
          <p className="text-primary-normal">투자자에게 상담완료 및 후기작성 알림이 전송됩니다.</p>
        </div>
        <DoubleButton
          firstTitle={"변경/취소"}
          secondTitle={"상담 완료"}
          firstClickFunc={undoChangeClickHandler}
          secondClickFunc={completedClickHandler}
          role={"PB"}
          reviewCheck={reviewCheck}
        />
        <SingleButton title={"확인"} role={role} ClickFunc={checkClickHandler} />
        {isButtonOpen && (
          <ButtonModal modalContents={modalContents} isOpen={isButtonOpen} setIsOpen={setIsButtonOpen} />
        )}
      </section>
    </div>
  );
}

export default ConfirmedReservationPage;
