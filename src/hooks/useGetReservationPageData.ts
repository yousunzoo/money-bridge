import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { getReservationData } from "@/app/apis/services/user";
import { useReservationStore } from "@/store/reservationStore";
import { ILoginedUserInfo } from "@/types/common";
import { IReservationData } from "@/types/reservation";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useGetReservationPageData = () => {
  const [loading, setLoading] = useState(true);
  const params = useSearchParams().get("pbId");
  const { resetAnswers } = useReservationStore();

  const { isLoading: userLoading, isSuccess: isLogined } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["loginedUserInfo"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });

  if (!userLoading && !isLogined) {
    redirect("/login");
  }

  if (!params) {
    redirect("/lounge");
  }

  const { data: reservationData, isLoading: reservationLoading } = useQuery<IReservationData, AxiosError>({
    queryKey: ["reservation", params],
    queryFn: () => getReservationData(params),
    enabled: !!isLogined,
  });

  useEffect(() => {
    resetAnswers();
  }, []);
  useEffect(() => {
    if (userLoading || reservationLoading) {
      setLoading(true);
    }
    if (!userLoading && !reservationLoading) {
      setLoading(false);
    }
  }, [userLoading, reservationLoading]);

  return { reservationData, loading, params };
};
