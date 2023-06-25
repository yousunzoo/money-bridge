"use client";
import TopNav from "@/components/common/TopNav";
import React, { useEffect, useMemo, useState } from "react";
import ConsultationStatus from "../../components/managementPage/ConsultationStatus";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import ProcessList from "@/components/common/ProcessList";
import { getConsultationList, getConsultationStatus } from "../apis/services/pb";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ILoginedUserInfo } from "@/types/reservation";
import { getLoginedUserInfo } from "../apis/services/auth";
import { AxiosError } from "axios";
import { ConsultationStatue } from "@/types/management";
import { redirect, useSearchParams } from "next/navigation";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";

interface SelectedData {
  reservationId: number;
  isNewReservation: boolean;
  profileImage: string;
  name: string;
  createdAt: string;
  type: string;
}

const PROCESS_DATA: Record<string, { name: string; path: string }> = {
  APPLY: { name: "신규예약", path: "newReservation" },
  CONFIRM: { name: "예약확정", path: "confirmedReservation" },
  COMPLETE: { name: "상담완료", path: "completedConsultation" },
  WITHDRAW: { name: "예약취소", path: "canceledConsultation" },
};

function ManagementPage() {
  const [selectData, setSelectData] = useState<SelectedData[] | []>([]);
  const [selectPath, setSelectPath] = useState("newReservation");
  const searchParams = useSearchParams();
  const process = searchParams.get("process") || "APPLY";

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
    data: consultationStatus,
    isLoading: isStatusLoading,
    isError: isStatusError,
  } = useQuery<ConsultationStatue, AxiosError>(["consultationStatus"], getConsultationStatus);

  const {
    data: consultationList,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(
    ["consultationList", process],
    ({ pageParam = 0 }) => getConsultationList({ type: process, page: pageParam }),
    {
      getNextPageParam: ({ curPage, last }: { list: any; curPage: number; last: number }) =>
        last ? false : curPage + 1,
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
  isLogined && userInfo.role !== "PB" && redirect("/");
  // if (isStatusError | isListError) return <ErrorModal isError={true} path={"/schedule"} />;
  console.log("consultationStatus", consultationStatus);
  console.log("list", list);

  return (
    <div className="flex flex-col items-center">
      <TopNav title={"고객관리"} />
      <ConsultationStatus {...consultationStatus} />
      <ProcessList role={"pb"} />

      <div className="w-full h-2 my-8 bg-background-secondary"></div>

      <div className="justify-start w-full">
        <div>
          <h3 className="pl-1 text-lg font-bold">{`${PROCESS_DATA[process]?.name || PROCESS_DATA.APPLY.name} ${
            list?.length ? list?.length : 0
          }건`}</h3>
          <p className="pl-1 my-1 mb-6 text-sm">예약 희망 일정을 확인 한 후 유선으로 상담 일정을 조율해주세요.</p>
          <ul className="flex flex-col gap-4">
            {selectData?.length ? (
              selectData.map(({ reservationId, name, createdAt, type }) => (
                <UserReservationItem
                  buttonName="고객 정보"
                  key={reservationId}
                  href={`/management/${selectPath}/${reservationId}`}
                  isRole={"USER"}
                >
                  <p className="font-bold">{name}</p>
                  <p className="text-xs ">{createdAt} </p>
                  <p className="text-xs ">{type === "VISIT" ? "방문상담" : "유선상담"}</p>
                </UserReservationItem>
              ))
            ) : (
              <div>내역이 없습니다.</div>
            )}
          </ul>
          {hasNextPage && <div ref={ref} className="h-1" />}
        </div>
      </div>
    </div>
  );
}

export default ManagementPage;
