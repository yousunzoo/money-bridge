"use client";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import React, { useEffect, useState } from "react";
import ConsultationLocationSection from "@/components/common/ConsultationLocationSection";
import ConsultationNoteSection from "@/components/common/ConsultationNoteSection";
import DoubleButton from "@/components/common/DoubleButton";
import { useMutation } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import { confirmedReservation } from "@/app/apis/services/pb";
import ErrorModal from "@/components/common/ErrorModal";
import ScheduleSection from "@/components/managementPage/changeReservationPage/ScheduleSection";
import ButtonModal from "@/components/common/ButtonModal";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useGetReservationInfo } from "@/hooks/useGetReservationInfo";
import SingleButton from "@/components/common/SingleButton";

function NewReservationPage({ params: { slug } }: { params: { slug: number } }) {
  const router = useRouter();
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const [isSelectSchedule, setIsSelectSchedule] = useState(true);
  const [timeState, setTimeState] = useState("");

  const { userInfo, userLoading, isLogined } = useGetUserInfo();

  if (!isLogined && !userLoading) {
    redirect("/");
  }

  const { reservationInfo, reservationLoading, reservationError } = useGetReservationInfo(slug);

  const { mutate } = useMutation(confirmedReservation, {
    onSuccess: data => {
      router.push(`/management/confirmedReservation/${slug}`);
    },
  });

  // 상담 희망 일정(1순위, 2순위) 선택 버튼
  const selectTimeHandler = (clickTime: string) => {
    setIsSelectSchedule(!isSelectSchedule);
    setTimeState(clickTime);
  };

  const undoChangeClickHandler = () => {
    router.push(`/management/changeReservation/${slug}`);
  };

  const confirmedClickHandler = () => {
    setIsButtonOpen(true);
  };

  const modalContents = {
    content: "예약 확정을 하시겠습니까?",
    confirmText: "확인",
    cancelText: "취소",
    cancelFn: () => setIsButtonOpen(false),
    confirmFn: () =>
      mutate({
        id: slug,
        time: timeState,
      }),
  };

  useEffect(() => {
    if (reservationInfo) {
      setTimeState(reservationInfo.candidateTime1);
    }
  }, [reservationInfo]);

  const checkClickHandler = () => {
    router.push("/management?process=APPLY");
  };

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
  } = reservationInfo;
  if (!userInfo) return;
  const role = userInfo?.role;
  const formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");

  const scheduleSectionProps = {
    candidateTime1,
    candidateTime2,
    isSelectSchedule,
    selectTimeHandler,
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
      <div className="pb_top_Phrase mx-[-16px] mt-4 box-content w-full ">
        <span className="text-white ">투자자와 유선으로 상담 일정을 확정해주세요.</span>
      </div>
      <UserReservationItem buttonName="고객 정보" disabled={true} isRole={"USER"} profileImage={profileImage}>
        <p className="font-bold">{name}</p>
        <p className="text-xs ">{formattedPhoneNumber}</p>
        <p className="text-xs ">{type === "VISIT" ? "방문상담" : "유선상담"} </p>
      </UserReservationItem>
      <section className="mt-6 w-full rounded-md bg-white p-4 pb-6 text-xs ">
        <section className="my-4 w-full border-b-1 pb-4">
          <ScheduleSection {...scheduleSectionProps} />
        </section>
        <ConsultationLocationSection {...locationSectionProps} />
        <ConsultationNoteSection {...noteSectionProps} />
        <div className="mt-6 flex flex-col items-center text-xs">
          <p className="font-bold text-primary-normal">투자자와 유선연락을 통해 일정과 장소를 정하신 후</p>
          <p className="text-primary-normal">예약을 확정하시면 투자자에게 상담 확정 알림이 전송됩니다.</p>
        </div>
        <DoubleButton
          firstTitle={"변경/취소"}
          secondTitle={"예약 확정"}
          firstClickFunc={undoChangeClickHandler}
          secondClickFunc={confirmedClickHandler}
          role={"PB"}
        />
        <SingleButton title={"확인"} role={role} ClickFunc={checkClickHandler} />
        {isButtonOpen && (
          <ButtonModal modalContents={modalContents} isOpen={isButtonOpen} setIsOpen={setIsButtonOpen} />
        )}
      </section>
    </div>
  );
}

export default NewReservationPage;
