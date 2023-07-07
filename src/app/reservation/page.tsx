"use client";
import ReservationChat from "@/components/reservationPage/ReservationChat";
import { useGetReservationPageData } from "@/hooks/useGetReservationPageData";

function ReservationPage() {
  const { reservationData, params } = useGetReservationPageData();

  return <>{reservationData && <ReservationChat reservationData={reservationData} pbId={Number(params)} />}</>;
}

export default ReservationPage;
