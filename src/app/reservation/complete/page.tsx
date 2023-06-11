"use client";

import { useRouter } from "next/navigation";

function ReservationCompletePage() {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };
  return (
    <section className="flex h-full w-full flex-col px-4 py-[100px]">
      <div>
        <p className="mb-6 text-3xl font-bold">
          홍길동님의
          <br />
          상담 예약이 완료되었어요.
        </p>
        <p className="mb-6">
          PB가 예약가능 여부를 확인중에 있습니다.
          <br />
          빠른시간내로 확정결과를 <span className="font-semibold">전화</span>로 안내해드리겠습니다.
        </p>
        <p>확정까지 평균 소요 시간 : 10분~30분</p>
      </div>
      <button onClick={handleClick} className="mt-auto h-[56px] w-full rounded-lg bg-black text-white">
        완료
      </button>
    </section>
  );
}

export default ReservationCompletePage;
