import { IMyReservationStatusProps } from "@/types/my";
import Link from "next/link";

const LI_STYLE = "w-[31%] text-center py-3 shadow-md font-bold border-1 border-secondary-heavy rounded-md";
function MyReservationStatus({ reservationCount }: IMyReservationStatusProps) {
  const { apply, confirm, complete } = reservationCount;
  return (
    <section className="mb-10 rounded-lg bg-white p-5 shadow-md">
      <h3 className="mb-4 border-b-1 border-background-normal pb-3 font-bold">나의 예약</h3>
      <Link href="/myCounseling">
        <ul className="flex justify-between">
          <li className={LI_STYLE}>
            <p className="mb-3 text-[18px]">{apply}</p>
            <p className="text-xs">예약 신청</p>
          </li>
          <li className={LI_STYLE}>
            <p className="mb-3 text-[18px]">{confirm}</p>
            <p className="text-xs">예약 확정</p>
          </li>
          <li className={LI_STYLE}>
            <p className="mb-3 text-[18px]">{complete}</p>
            <p className="text-xs">상담 완료</p>
          </li>
        </ul>
      </Link>
    </section>
  );
}

export default MyReservationStatus;
