"use client";
import { getMyPropensity } from "@/app/apis/services/user";
import TopNav from "@/components/common/TopNav";
import HydratePropensity from "@/components/myPage/propensityPage/HydratePropensity";
import ModalLayout from "@/components/reservationPage/ModalLayout";
import { IPropensityData } from "@/types/my";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function PropensityPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isSuccess } = useQuery<IPropensityData, AxiosError>({
    queryKey: ["myPropensity"],
    queryFn: getMyPropensity,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const handleCloseModal = () => {
    setIsOpen(false);
    router.push("/analysis");
  };

  useEffect(() => {
    if (isSuccess && !data.propensity) {
      setIsOpen(true);
    }
    if (!isSuccess) {
      router.replace("/my");
    }
  }, [data, isSuccess]);

  return (
    <>
      <TopNav title="나의 투자 성향 분석" hasBack={true} />
      {isSuccess && <HydratePropensity propensityData={data} />}
      <p className="mb-[130px] break-keep text-center text-xs  leading-[18px] text-gray-heavy">
        제공되는 투자자성향 분석 결과는 투자자께서 제공하신 정보를 바탕으로 분석되었으며,
        <br />
        거래목적, 계약기간·기대이익·기대손실을 고려한 위험에 대한 태도, 금융상품에 대한 이해도,
        <br />
        재산상황, 투자성 상품의 취득·처분 경험, 연령 등에 비추어
        <br />
        적합하지 않은 상품은 투자권유가 불가합니다.
      </p>
      <Link href="/pblist/recommend" className="button mb-3 text-xl">
        추천 PB 리스트 가기
      </Link>
      <Link href="/analysis" className="button_outlined text-xl">
        성향 수정하기
      </Link>
      {isOpen && (
        <ModalLayout handleCloseModal={handleCloseModal}>
          <h3>투자성향을 분석하시겠어요?</h3>
          <p>투자성향 분석으로 나에게 딱 맞는 PB를 추천 받을 수 있어요!</p>
        </ModalLayout>
      )}
    </>
  );
}

export default PropensityPage;
