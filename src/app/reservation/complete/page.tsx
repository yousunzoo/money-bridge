"use client";

import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { ILoginedUserInfo } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { redirect, useRouter } from "next/navigation";

function ReservationCompletePage() {
  const router = useRouter();

  const {
    data: userInfo,
    isLoading: userLoading,
    isSuccess: isLogined,
  } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["loginedUserInfo"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });

  if (!isLogined) {
    redirect("/");
  }

  const handleClick = () => {
    router.back();
  };

  if (userLoading) return null;
  return (
    <section className="flex h-[100%] w-full flex-col py-[100px]">
      <div>
        <p className="mb-6 text-2xl font-bold">
          {userInfo.name}님의
          <br />
          상담 예약이 완료되었어요.
        </p>
        <p className="mb-6 break-keep">
          PB가 예약가능 여부를 확인중에 있습니다.
          <br />
          빠른 시간 내로 확정결과를 <span className="font-semibold">전화</span>로 안내해드리겠습니다.
        </p>
        <p>확정까지 평균 소요 시간 : 10분~30분</p>
      </div>
      <button onClick={handleClick} className="mt-[50px] h-[56px] w-full rounded-lg bg-black text-white">
        완료
      </button>
    </section>
  );
}

export default ReservationCompletePage;
