export const PROCESS_DATA: Record<string, { name: string; path: string }> = {
  APPLY: { name: "신규예약", path: "newReservation" },
  CONFIRM: { name: "예약확정", path: "confirmedReservation" },
  COMPLETE: { name: "상담완료", path: "completedConsultation" },
  WITHDRAW: { name: "예약취소", path: "canceledConsultation" },
};
