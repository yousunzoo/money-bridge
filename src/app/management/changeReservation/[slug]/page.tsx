"use client";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import TopNav from "@/components/common/TopNav";
import React, { useEffect, useState } from "react";
import ConsultationNoteSection from "@/components/common/ConsultationNoteSection";
import DoubleButton from "@/components/common/DoubleButton";
import ScheduleSection from "@/components/managementPage/changeReservationPage/ScheduleSection";
import dayjs, { Dayjs } from "dayjs";
import CalendarModal from "@/components/managementPage/changeReservationPage/CalendarModal";
import TimeModal from "@/components/managementPage/changeReservationPage/TimeModal";
import CounselingModal from "@/components/managementPage/changeReservationPage/CounselingModal";
import LocationChangeModal from "@/components/managementPage/changeReservationPage/LocationChangeModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { redirect, useRouter } from "next/navigation";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useGetReservationInfo } from "@/hooks/useGetReservationInfo";
import { changeReservation, deleteReservation } from "@/app/apis/services/pb";
import ErrorModal from "@/components/common/ErrorModal";
import ButtonModal from "@/components/common/ButtonModal";
import { ChangeReservationProps } from "@/types/pb";
import ConsultationScheduleSection from "@/components/common/ConsultationScheduleSection";

interface ChangeStatusProps {
  id: number;
  time: string;
  type: string;
  category: string | null;
}

function ChangeReservationPage({ params: { slug } }: { params: { slug: number } }) {
  const router = useRouter();
  const [buttonType, setButtonType] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);
  const [isSelectSchedule, setIsSelectSchedule] = useState(true);
  const [isOpenVisit, setIsOpenVisit] = useState(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [isOpenTime, setIsOpenTime] = useState(false);
  const [isOpenLocation, setIsOpenLocation] = useState(false);
  const [isButtonOpen, setIsButtonOpen] = useState(false);

  const { userInfo, userLoading, isLogined } = useGetUserInfo();

  const [changeState, setChangeState] = useState<ChangeStatusProps>({
    id: 0,
    time: "",
    type: "",
    category: "",
  });

  if (!isLogined && !userLoading) {
    redirect("/");
  }

  const { reservationInfo, reservationLoading, reservationError } = useGetReservationInfo(slug);

  const { mutate: changeMutate } = useMutation<null, AxiosError, ChangeReservationProps>(changeReservation, {
    onSuccess: () => {
      router.push(`management/confirmedReservation/${slug}`);
    },
  });

  const { mutate: cancelMutate } = useMutation<null, AxiosError, number>(deleteReservation, {
    onSuccess: () => {
      router.push(`management/canceledConsultation/${slug}`);
    },
  });

  useEffect(() => {
    if (!reservationInfo) return;
    setChangeState({
      id: slug,
      time: candidateTime1,
      type: type,
      category: type === "CALL" ? null : "BRANCH",
    });
  }, [reservationInfo]);

  if (!userInfo) return;
  const role = userInfo.role;

  // 상담 희망 일정(1순위, 2순위) 선택 버튼
  const selectTimeHandler = (clickTime: string) => {
    setIsSelectSchedule(!isSelectSchedule);
    setChangeState(prevState => ({
      ...prevState,
      time: clickTime,
    }));
  };

  // 방문상담 수정 오픈 버튼
  const visitOpenHandler = () => {
    setIsOpenVisit(!isOpenVisit);
  };

  // 미팅장소 수정 오픈 버튼
  const locationOpenHandler = () => {
    setIsOpenLocation(!isOpenLocation);
  };

  // 상담 방식 선택 버튼
  const selectTypeHandler = (clickType: string) => {
    setChangeState(prevState => ({
      ...prevState,
      type: clickType,
      category: clickType === "CALL" ? null : "BRANCH",
    }));
    setIsOpenVisit(false);
  };

  // 미팅 장소 선택 버튼
  const selectLocationHandler = (clickType: string | null) => {
    setChangeState(prevState => ({
      ...prevState,
      type: clickType === null ? "CALL" : "VISIT",
      category: clickType,
    }));

    setIsOpenLocation(false);
  };

  // 상담 일정 변경 캘린더 오픈 버튼
  const calendarOpenHandler = () => {
    setIsOpenCalendar(!isOpenCalendar);
  };

  // 상담 일정 변경 시간 오픈 버튼
  const timeOpenHandler = () => {
    setIsOpenTime(!isOpenTime);
  };

  // 상담일정 변경
  const handleCalendarSelect = (e: Dayjs) => {
    const date = e.format();
    setIsDisabled(false);
    setChangeState(prevState => ({
      ...prevState,
      time: date,
    }));
  };

  // 상담 시간 변경
  const handleTimeSelect = (time: string) => {
    const hour = Number(time.split(":")[0]);
    const candidate = dayjs(changeState.time, "YYYY-MM-DD").set("hour", hour).format("YYYY-MM-DDTHH:mm:ss");
    setChangeState(prevState => ({
      ...prevState,
      time: candidate,
    }));
  };

  // 날짜 선택
  const dateSelectClick = () => {
    setIsOpenCalendar(!isOpenCalendar);
    setIsOpenTime(!isOpenTime);
  };

  // 시간 선택
  const timeSelectClick = () => {
    setIsOpenTime(!isOpenTime);
  };

  // 상담 취소 버튼
  const cancelReservationHandler = () => {
    setButtonType("cancel");
    setIsButtonOpen(true);
  };

  // 변경 및 예약 확정 버튼
  const changeCompleteHandler = () => {
    setButtonType("change");
    setIsButtonOpen(true);
  };

  if (reservationInfo === undefined) return null;

  const cancelmodalContents = {
    content: "예약을 취소 하시겠습니까?",
    confirmText: "확인",
    cancelText: "취소",
    cancelFn: () => setIsButtonOpen(false),
    confirmFn: () => {
      cancelMutate(slug);
    },
  };

  const changemodalContents = {
    content: "예약 확정을 하시겠습니까?",
    confirmText: "확인",
    cancelText: "취소",
    cancelFn: () => setIsButtonOpen(false),
    confirmFn: () => {
      changeMutate(changeState);
    },
  };

  const {
    profileImage,
    name,
    phoneNumber,
    candidateTime1,
    candidateTime2,
    location,
    consultStart,
    consultEnd,
    goal,
    notice,
    question,
    type,
    time,
  } = reservationInfo;

  const noteSectionProps = { role, goal, question };

  const timeModalProps = {
    timeOpenHandler,
    consultTime: { consultStart, consultEnd, notice },
    selectedDate: changeState.time,
    handleTimeSelect,
    timeSelectClick,
    isDisabled,
    setIsDisabled,
  };
  const scheduleSectionProps = { role, time };
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
      <TopNav title="예약 변경" hasBack={true} />

      <div className="pb_top_Phrase mx-[-16px] mt-4 box-content w-full ">
        <span className="text-white ">예약일자를 확정지어야 상담예약이 확정됩니다.</span>
      </div>
      <UserReservationItem buttonName="고객 정보" href={"/"} isRole={"USER"} profileImage={profileImage}>
        <p className="font-bold">{name}</p>
        <p className="text-xs ">{phoneNumber}</p>
        <p className="text-xs ">{type === "VISIT" ? "방문상담" : "유선상담"} </p>
      </UserReservationItem>

      <section className="w-full p-4 pb-6 mt-6 text-xs bg-white rounded-md">
        {time ? (
          <ConsultationScheduleSection {...scheduleSectionProps} />
        ) : (
          <ScheduleSection
            candidateTime1={candidateTime1}
            candidateTime2={candidateTime2}
            isSelectSchedule={isSelectSchedule}
            selectTimeHandler={selectTimeHandler}
          />
        )}
        <section className="flex justify-between pb-4 mt-8 mb-4 border-b-1">
          <h3 className="font-bold">상담 일정이 변경되셨나요?</h3>
          <button
            onClick={calendarOpenHandler}
            className="flex w-[150px] items-center justify-center rounded-md bg-primary-normal py-1 text-white"
          >
            확정된 일정 입력하기
          </button>
        </section>
        <section className="flex flex-col pb-4 mb-4 border-b-1">
          <CounselingModal
            visitOpenHandler={visitOpenHandler}
            type={changeState.type}
            isOpenVisit={isOpenVisit}
            selectTypeHandler={selectTypeHandler}
          />
          <LocationChangeModal
            type={changeState.type}
            location={location}
            locationOpenHandler={locationOpenHandler}
            isOpenLocation={isOpenLocation}
            selectLocationHandler={selectLocationHandler}
          />
        </section>
        <ConsultationNoteSection {...noteSectionProps} />
        <div className="flex flex-col items-center pt-6 text-xs">
          <p className="font-bold text-primary-normal">투자자와 유선연락을 통해 일정과 장소를 정하신 후</p>
          <p className="text-primary-normal">예약을 확정하시면 투자자에게 상담 확정 알림이 전송됩니다.</p>
        </div>
        <DoubleButton
          firstTitle={"예약 취소"}
          secondTitle={"변경 및 상담 확정"}
          firstClickFunc={cancelReservationHandler}
          secondClickFunc={changeCompleteHandler}
          role={"PB"}
        />
      </section>
      {isButtonOpen && buttonType === "change" ? (
        <ButtonModal modalContents={changemodalContents} isOpen={isButtonOpen} setIsOpen={setIsButtonOpen} />
      ) : (
        <ButtonModal modalContents={cancelmodalContents} isOpen={isButtonOpen} setIsOpen={setIsButtonOpen} />
      )}
      {isOpenCalendar && (
        <CalendarModal
          calendarOpenHandler={calendarOpenHandler}
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
          handleCalendarSelect={handleCalendarSelect}
          dateSelectClick={dateSelectClick}
        />
      )}
      {isOpenTime && <TimeModal {...timeModalProps} />}
    </div>
  );
}

export default ChangeReservationPage;
