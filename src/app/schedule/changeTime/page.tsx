"use client";
import TopNav from "@/components/common/TopNav";
import React, { useEffect, useState } from "react";
import TimePickerButton from "@/components/schedulePage/changeTimePage/TimePickerButton";
import DoubleButton from "@/components/common/DoubleButton";
import { getConsultTime, updateConsultTime } from "@/app/apis/services/pb";
import { AxiosError } from "axios";
import { ConsultationTimeCardProps } from "@/types/schedule";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import ErrorModal from "@/components/common/ErrorModal";
import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { ILoginedUserInfo } from "@/types/common";

function ChangeTimePage() {
  const queryClient = useQueryClient();
  const router = useRouter();

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
    data: consultTime,
    isError: consultError,
    isLoading: consultLoading,
  } = useQuery<ConsultationTimeCardProps, AxiosError>({
    queryKey: ["consultTime"],
    queryFn: getConsultTime,
  });

  const { mutate } = useMutation(updateConsultTime, {
    onSuccess: () => {
      queryClient.invalidateQueries(["consultTime"]);
      router.back();
    },
  });

  const [isOpenModal, setIsOpenModal] = useState({
    startModal: false,
    endModal: false,
  });

  const [changeData, setChangeData] = useState({
    consultStart: consultTime?.consultStart,
    consultEnd: consultTime?.consultEnd,
    consultNotice: "",
  });

  useEffect(() => {}, [changeData]);
  const startTimeSelect = (e: React.MouseEvent<HTMLElement>) => {
    setIsOpenModal({
      ...isOpenModal,
      startModal: !isOpenModal.startModal,
    });
    const target = e.target as HTMLLIElement;
    setChangeData({
      ...changeData,
      consultStart: target.id,
    });
  };

  const endTimeSelect = (e: React.MouseEvent<HTMLElement>) => {
    setIsOpenModal({
      ...isOpenModal,
      endModal: !isOpenModal.endModal,
    });
    const target = e.target as HTMLLIElement;

    setChangeData({
      ...changeData,
      consultEnd: target.id,
    });
  };

  const noticeChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value.slice(0, 100);
    if (inputValue.length <= 100) {
      e.target.value = inputValue;
      setChangeData({
        ...changeData,
        consultNotice: inputValue,
      });
    } else {
      e.preventDefault();
    }
  };

  const cancelChangeHandler = () => {
    router.back();
  };
  const changeCompleteHandler = () => {
    mutate({
      consultStart: changeData.consultStart,
      consultEnd: changeData.consultEnd,
      consultNotice: changeData.consultNotice,
    });
  };

  const startTimeButtonProps = {
    timeSelect: startTimeSelect,
    selectTime: changeData.consultStart,
    isOpenModal: isOpenModal.startModal,
  };
  const endTimeButtonProps = {
    timeSelect: endTimeSelect,
    selectTime: changeData.consultEnd,
    isOpenModal: isOpenModal.endModal,
  };

  isLogined && userInfo.role !== "PB" && redirect("/");
  if (consultError) return <ErrorModal isError={true} path={"/schedule"} />;

  return (
    <div>
      <TopNav title={"상담 가능 시간 변경하기"} hasBack={true} />
      <section>
        <h3 className="mt-10 text-lg font-bold">상담 가능 시간을 설정해주세요.</h3>
        <div className="flex items-center justify-around px-4 mt-4 rounded-md shadow-md py-7">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-center">업무 시작 시간</span>
            <TimePickerButton {...startTimeButtonProps} />
          </div>
          <div className="flex flex-col w-2 h-full align-bottom">
            <span className="mt-8 text-gray-normal">~</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-center">업무 종료 시간</span>
            <TimePickerButton {...endTimeButtonProps} />
          </div>
        </div>
      </section>
      <div className="mt-8 mb-4">
        <span className="text-sm font-bold">· 점심시간 등 상담이 불가한 요일, 시간을 알려주세요 (100자 이내)</span>
      </div>
      <section className="w-full p-2 bg-white rounded-md shadow-md">
        <textarea
          name=""
          id=""
          placeholder="EX) 점심시간:오후 12:00~13:00, 화요일 상담 불가"
          rows={6}
          cols={50}
          onChange={noticeChangeHandler}
          className="w-full p-2 mt-4 text-sm rounded-md bg-background-secondary"
        ></textarea>
      </section>
      <DoubleButton
        role="PB"
        firstTitle="변경 취소"
        secondTitle="변경 완료"
        firstClickFunc={cancelChangeHandler}
        secondClickFunc={changeCompleteHandler}
      ></DoubleButton>
      <div className="my-8 text-sm text-gray-normal">
        <p>· 해당 정보는 투자자 예약 정보에서 전달사항으로 표시 됩니다.</p>
        <p>· 투자 상품 서비스 상담은 유선상담 또는 방문상담시에만 가능합니다.</p>
      </div>
    </div>
  );
}

export default ChangeTimePage;