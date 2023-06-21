"use client";
import { getMyPropensity } from "@/app/apis/services/user";
import TopNav from "@/components/common/TopNav";
import PropensityChart from "@/components/myPage/propensityPage/PropensityChart";
import PropensityInfoCard from "@/components/myPage/propensityPage/PropensityInfoCard";
import RecommendPBList from "@/components/myPage/propensityPage/RecommendPBList";
import RiskGrades from "@/components/myPage/propensityPage/RiskGrades";
import { propensityDetailedList } from "@/constants/propensityList";
import { IPropensityData } from "@/types/my";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function PropensityPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["myPropensity"],
    queryFn: getMyPropensity,
    refetchOnWindowFocus: false,
  });

  if (isLoading || !data) return <>loading</>;
  const { name, propensity, list } = data as IPropensityData;
  const userPropensity = propensity && propensityDetailedList[propensity];
  if (!userPropensity) {
    router.push("/analysis");
    return;
  }

  return (
    <>
      <TopNav title="나의 투자 성향 분석" hasBack={true} />
      <h2 className="mb-6 text-2xl font-bold">
        {name}님의 투자성향은
        <br />
        <span className="text-primary-normal">{userPropensity.propensity}</span>입니다.
      </h2>
      {userPropensity && <PropensityInfoCard propensity={userPropensity.propensity} info={userPropensity.info} />}
      <PropensityChart propensity={userPropensity.propensity} />
      <RiskGrades grade={userPropensity.grade} />
      <RecommendPBList list={list} />
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
    </>
  );
}

export default PropensityPage;
