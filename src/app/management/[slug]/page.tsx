import UserReservationItem from "@/components/common/CardItem/UserReservationItem";
import React from "react";

interface ConsultationStatusPageProps {
  params: {
    slug: string;
  };
}

function ConsultationStatusPage({ params: { slug } }: ConsultationStatusPageProps) {
  return (
    <div>
      <UserReservationItem buttonName={"확인하기"}>
        <div>{slug}</div>
      </UserReservationItem>
    </div>
  );
}

export default ConsultationStatusPage;
