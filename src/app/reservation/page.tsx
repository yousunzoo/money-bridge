"use client";
import ReservationChat from "@/components/reservationPage/ReservationChat";
import { useGetReservationPageData } from "@/hooks/useGetReservationPageData";
import { getCookie } from "@/utils/cookies";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function ReservationPage() {
  const Authorization = getCookie("Authorization");
  const { reservationData, params } = useGetReservationPageData();

  useEffect(() => {
    if (!Authorization) {
      redirect("/login");
    }
  }, []);
  return <>{reservationData && <ReservationChat reservationData={reservationData} pbId={Number(params)} />}</>;
}

export default ReservationPage;
