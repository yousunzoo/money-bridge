"use client";

import TopNav from "@/components/common/TopNav";
import ReservationChat from "@/components/reservationPage/ReservationChat";
import { useGetReservationPageData } from "@/hooks/useGetReservationPageData";

function ReservationPage() {
  const { reservationData, loading, params } = useGetReservationPageData();

  if (loading || !reservationData) return null;
  return (
    <>
      <TopNav title="상담 예약" hasBack={true} />
      <ReservationChat reservationData={reservationData} pbId={Number(params)} />
    </>
  );
}

export default ReservationPage;
