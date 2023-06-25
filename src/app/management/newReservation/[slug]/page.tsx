"use client";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import TopNav from "@/components/common/TopNav";
import React, { useEffect, useState } from "react";
import ConsultationLocationSection from "@/components/common/ConsultationLocationSection";
import ConsultationNoteSection from "@/components/common/ConsultationNoteSection";
import DoubleButton from "@/components/common/DoubleButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { redirect, useRouter } from "next/navigation";
import { changeReservation, confirmedReservation, getReservationInfo } from "@/app/apis/services/pb";
import { ILoginedUserInfo } from "@/types/common";
import ErrorModal from "@/components/common/ErrorModal";
import ScheduleSection from "@/components/managementPage/changeReservationPage/ScheduleSection";

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
  consultEnd: string;
  consultStart: string;
  email: string;
  notice: string;
  reviewCheck: boolean;
  userId: number;
}

function NewReservationPage({ params: { slug } }: { params: { slug: number } }) {
  const router = useRouter();
  const [isSelectSchedule, setIsSelectSchedule] = useState(true);
  const [timeState, setTimeState] = useState("");
  const {
    data: userInfo,
    isLoading: userLoading,
    isSuccess: isLogined,
  } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["loginedUserInfo"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });

  if (!isLogined && !userLoading) {
    redirect("/");
  }
  const {
    data: reservationInfo,
    isLoading: reservationLoading,
    isError: reservationError,
  } = useQuery<ReservationData, AxiosError>({
    queryKey: ["getReservationInfo", slug],
    queryFn: () =>
      getReservationInfo({
        id: slug,
      }),
  });

  const { mutate } = useMutation(confirmedReservation, {
    onSuccess: () => {},
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
    mutate({
      id: slug,
      time: timeState,
    });
  };

  useEffect(() => {
    if (reservationInfo) {
      setTimeState(reservationInfo.candidateTime1);
    }
  }, [reservationInfo]);

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
    return <ErrorModal isError={true} path={"/"} content={"권한이 없습니다. 다시 시도해주세요."} />;
  if (reservationError)
    return <ErrorModal isError={true} path={"/"} content={"일시적인 문제가 발생했습니다. 다시 시도해주세요."} />;

  return (
    <div>
      <TopNav title="신규예약" hasBack={true} />
      <div className="mt-4 pb_top_Phrase">
        <span className="text-white ">투자자와 유선으로 상담 일정을 확정해주세요.</span>
      </div>
      <UserReservationItem buttonName="고객 정보" href={"/"} isRole={"USER"} profileImage={profileImage}>
        <p className="font-bold">{name}</p>
        <p className="text-xs ">{formattedPhoneNumber}</p>
        <p className="text-xs ">{type === "VISIT" ? "방문상담" : "유선상담"} </p>
      </UserReservationItem>
      <section className="w-full p-4 pb-6 mt-6 text-xs bg-white rounded-md ">
        <section className="w-full pb-4 my-4 border-b-1">
          <ScheduleSection {...scheduleSectionProps} />
        </section>

        <ConsultationLocationSection {...locationSectionProps} />
        <ConsultationNoteSection {...noteSectionProps} />
        <div className="flex flex-col items-center pt-6 text-xs">
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
      </section>
    </div>
  );
}

export default NewReservationPage;
