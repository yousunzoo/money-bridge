"use client";
import TopNav from "@/components/common/TopNav";
import PropensityChart from "@/components/myPage/propensityPage/PropensityChart";
import PropensityInfoCard from "@/components/myPage/propensityPage/PropensityInfoCard";
import { propensityDetailedList } from "@/constants/propensityList";
import propensityData from "@/mocks/seon/propensityPage.json";
import { IPropensityData } from "@/types/my";
import { useRouter } from "next/navigation";
import React from "react";

function PropensityPage() {
  const router = useRouter();
  const { name, propensity, list } = propensityData.data as IPropensityData;
  const userPropensity = propensity ? propensityDetailedList[propensity] : null;
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
      <PropensityInfoCard propensity={userPropensity.propensity} info={userPropensity.info} />
      <PropensityChart />
    </>
  );
}

export default PropensityPage;
