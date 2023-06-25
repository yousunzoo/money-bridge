"use client";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import TopNav from "@/components/common/TopNav";
import React from "react";
import res from "../../../../mocks/kjun/managementReservations.json";
import ConsultationScheduleSection from "@/components/common/ConsultationScheduleSection";
import ConsultationLocationSection from "@/components/common/ConsultationLocationSection";
import ConsultationNoteSection from "@/components/common/ConsultationNoteSection";
import DoubleButton from "@/components/common/DoubleButton";
import { useQuery } from "@tanstack/react-query";
import { ILoginedUserInfo } from "@/types/reservation";
import { AxiosError } from "axios";
import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { redirect } from "next/navigation";
import { getReservationInfo } from "@/app/apis/services/pb";

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
  // profileImage데이터는 api등록 후 UserReservationItem props 내려주고 코드 변경하기
  const {
    data: userInfo,
    isLoading: userLoading,
    isSuccess: isLogined,
  } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["loginedUserInfo"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });

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

  console.log(reservationInfo);

  const role = "PB";

  const undoChangeClickHandler = () => {
    console.log("변경/취소");
  };

  const confirmedClickHandler = () => {
    console.log("상담확정");
  };

  if (reservationInfo === undefined) return;
  const { candidateTime1, name, phoneNumber, candidateTime2, time, type, location, locationAddress, goal, question } =
    reservationInfo;

  const formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");

  const scheduleSectionProps = { candidateTime1, candidateTime2, role, time };
  const locationSectionProps = { type, role, location, locationAddress };
  const noteSectionProps = { role, goal, question };

  isLogined && userInfo.role !== "PB" && redirect("/");

  return (
    <div>
      <TopNav title="신규예약" hasBack={true} />
      <div className="mt-4 pb_top_Phrase">
        <span className="text-white ">투자자와 유선으로 상담 일정을 확정해주세요.</span>
      </div>
      <UserReservationItem buttonName="고객 정보" href={"/"} isRole={"USER"}>
        <p className="font-bold">{name}</p>
        <p className="text-xs ">{formattedPhoneNumber}</p>
        <p className="text-xs ">{type === "VISIT" ? "방문상담" : "유선상담"} </p>
      </UserReservationItem>
      <section className="w-full p-4 pb-6 mt-6 text-xs bg-white rounded-md">
        <ConsultationScheduleSection {...scheduleSectionProps} />
        <ConsultationLocationSection {...locationSectionProps} />
        <ConsultationNoteSection {...noteSectionProps} />
        <div className="flex flex-col items-center pt-6 text-xs">
          <p className="font-bold text-primary-normal">투자자와 유선연락을 통해 일정과 장소를 정하신 후</p>
          <p className="text-primary-normal">예약을 확정하시면 투자자에게 상담 확정 알림이 전송됩니다.</p>
        </div>
        <DoubleButton
          firstTitle={"변경/취소"}
          secondTitle={"상담 확정"}
          firstClickFunc={undoChangeClickHandler}
          secondClickFunc={confirmedClickHandler}
          role={"PB"}
        />
      </section>
    </div>
  );
}

export default NewReservationPage;
