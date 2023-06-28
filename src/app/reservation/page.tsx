"use client";

import TopNav from "@/components/common/TopNav";
import ReservationChat from "@/components/reservationPage/ReservationChat";
import { useGetReservationPageData } from "@/hooks/useGetReservationPageData";

function ReservationPage() {
  const { reservationData, params } = useGetReservationPageData();

  return (
    <>
      <TopNav title="상담 예약" hasBack={true} />
      {reservationData && <ReservationChat reservationData={reservationData} pbId={Number(params)} />}
    </>
  );
}

export default ReservationPage;
