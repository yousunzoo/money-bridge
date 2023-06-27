"use client";

import TopNav from "@/components/common/TopNav";
import React, { useEffect, useMemo, useState } from "react";
import ProcessList from "@/components/common/ProcessList";
import pocessData from "../../mocks/kjun/managementRevervationStatue.json";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import managementRecent from "../../mocks/kjun/managementRecent.json";
import UserConsultationStatus from "./UserConsultationStatus";
import { redirect, useSearchParams } from "next/navigation";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useUserReservationInfo } from "@/hooks/useGetUserReservationInfo";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ConsultationStatusProps } from "@/types/management";
import { AxiosError } from "axios";
import { getUserConsultationList, getUserReservationRecent } from "../apis/services/user";
import { PROCESS_DATA } from "@/constants/reservation";
import { getConsultationList } from "../apis/services/pb";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
import ErrorModal from "@/components/common/ErrorModal";
const PROCESS_NAME: Record<string, string> = {
  APPLY: "신규예약",
  CONFIRM: "예약확정",
  COMPLETE: "상담완료",
  WITHDRAW: "예약취소",
};
interface SelectedData {
  reservationId: number;
  isNewReservation: boolean;
  profileImage: string;
  name: string;
  createdAt: string;
  type: string;
}

function MyCounselingPage() {
  const [isProcess, setIsProcess] = useState("APPLY");
  const [selectData, setSelectData] = useState<SelectedData[] | null>(null);
  const searchParams = useSearchParams();
  const process = searchParams.get("process") || "APPLY";
  const [selectPath, setSelectPath] = useState("newReservation");

  const { userInfo, userLoading, isLogined } = useGetUserInfo();
  const {
    data: consultationStatus,
    isLoading: isStatusLoading,
    isError: isStatusError,
  } = useQuery<ConsultationStatusProps, AxiosError>(["userConsultationStatus"], getUserReservationRecent);

  if (!isLogined && !userLoading) {
    redirect("/");
  }

  const {
    data: consultationList,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isError: isListError,
  } = useInfiniteQuery(
    ["consultationList", process],
    ({ pageParam = 0 }) => getUserConsultationList({ type: process, page: pageParam }),
    {
      getNextPageParam: ({ curPage, last }) => (last ? false : curPage + 1),
    },
  );

  const list = useMemo(
    () => (consultationList ? (consultationList.pages || []).flatMap(data => data.list) : []),
    [consultationList],
  );

  const ref = useIntersectionObserver(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  useEffect(() => {
    const { path } = PROCESS_DATA[process] || PROCESS_DATA.APPLY;
    setSelectPath(path);
    setSelectData(list);
  }, [consultationList, process]);

  if (!consultationStatus) return;

  if (userInfo?.role !== "USER")
    return <ErrorModal isError={true} path={"/"} content={"권한이 없습니다. 다시 시도해주세요."} />;
  if (isStatusError || isListError)
    return <ErrorModal isError={true} path={"/"} content={"일시적인 문제가 발생했습니다. 다시 시도해주세요."} />;

  return (
    <div>
      <TopNav title={"나의 상담"} />
      <UserConsultationStatus {...consultationStatus} />
      <ProcessList role={userInfo.role} linkHref={"myCounseling"} />

      <div className="w-full h-2 my-8 bg-background-secondary"></div>

      <div className="justify-start w-full">
        <div>
          <h3 className="pl-1 text-lg font-bold">{`${PROCESS_DATA[process]?.name || PROCESS_DATA.APPLY.name} ${
            consultationList?.pages[0].totalElements ?? 0
          }건`}</h3>
          <p className="pl-1 my-1 mb-6 text-sm">프라이빗 뱅커가 곧 유선으로 연락을 드립니다.</p>
          <ul className="flex flex-col gap-4">
            {selectData &&
              selectData.map(({ reservationId, name, createdAt, type }) => (
                <UserReservationItem
                  buttonName="정보 보기"
                  key={reservationId}
                  href={`/myCounseling/${selectPath}/${reservationId}`}
                  isRole={"pb"}
                  profileImage=""
                >
                  <p className="font-bold">{name}</p>
                  <p className="text-xs ">{createdAt} </p>
                  <p className="text-xs ">{type === "VISIT" ? "방문상담" : "유선상담"}</p>
                </UserReservationItem>
              ))}
          </ul>
          {hasNextPage && <div ref={ref} className="h-1" />}
        </div>
      </div>
    </div>
  );
}

export default MyCounselingPage;
