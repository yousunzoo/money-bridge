"use client";
import TopNav from "@/components/common/TopNav";
import React, { useEffect, useMemo, useState } from "react";
import ConsultationStatus from "../../components/managementPage/ConsultationStatus";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import ProcessList from "@/components/common/ProcessList";
import { getConsultationList, getConsultationStatus } from "../apis/services/pb";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getLoginedUserInfo } from "../apis/services/auth";
import { AxiosError } from "axios";
import { ConsultationStatusProps, SelectedData } from "@/types/management";
import { redirect, useSearchParams } from "next/navigation";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
import { ILoginedUserInfo } from "@/types/common";
import ErrorModal from "@/components/common/ErrorModal";
import { PROCESS_DATA } from "@/constants/reservation";

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

  if (!isLogined && !userLoading) {
    redirect("/");
  }

  const {
    data: consultationStatus,
    isLoading: isStatusLoading,
    isError: isStatusError,
  } = useQuery<ConsultationStatusProps, AxiosError>(["consultationStatus"], getConsultationStatus);

  const {
    data: consultationList,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isError: isListError,
  } = useInfiniteQuery(
    ["consultationList", process],
    ({ pageParam = 0 }) => getConsultationList({ type: process, page: pageParam }),
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
  if (userInfo?.role !== "PB")
    return <ErrorModal isError={true} path={"/"} content={"권한이 없습니다. 다시 시도해주세요."} />;
  if (isStatusError || isListError)
    return <ErrorModal isError={true} path={"/"} content={"일시적인 문제가 발생했습니다. 다시 시도해주세요."} />;

  return (
    <div className="flex flex-col items-center">
      <TopNav title={"고객관리"} />
      <ConsultationStatus consultationStatus={consultationStatus} pbId={userInfo.id} />
      <ProcessList role={"pb"} linkHref="management" />

      <div className="my-8 h-2 w-full bg-background-secondary"></div>

      <div className="w-full justify-start">
        <div>
          <h3 className="text-lg pl-1 font-bold">{`${PROCESS_DATA[process]?.name || PROCESS_DATA.APPLY.name} ${
            consultationList?.pages[0].totalElements ?? 0
          }건`}</h3>
          <p className="my-1 mb-6 pl-1 text-sm">예약 희망 일정을 확인 한 후 유선으로 상담 일정을 조율해주세요.</p>
          <ul className="flex flex-col gap-4">
            {selectData?.length ? (
              selectData.map(({ reservationId, name, createdAt, type, profileImage }) => (
                <UserReservationItem
                  buttonName="고객 정보"
                  key={reservationId}
                  href={`/management/${selectPath}/${reservationId}`}
                  isRole={"USER"}
                  profileImage={profileImage}
                >
                  <p className="font-bold">{name}</p>
                  <p className="text-xs ">{createdAt.slice(5)} </p>
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
