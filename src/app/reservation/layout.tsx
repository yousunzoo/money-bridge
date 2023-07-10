import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "상담 예약하기",
};

function ReservationLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default ReservationLayout;
