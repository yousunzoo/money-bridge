import { IPropensityData } from "@/types/my";
import React from "react";
import PropensityInfoCard from "./PropensityInfoCard";
import PropensityChart from "./PropensityChart";
import RiskGrades from "./RiskGrades";
import RecommendPBList from "./RecommendPBList";
import { propensityDetailedList } from "@/constants/propensityList";

function HydratePropensity({ propensityData }: { propensityData: IPropensityData }) {
  const { name, propensity, list } = propensityData;
  const userPropensity = propensity && propensityDetailedList[propensity];

  return (
    <>
      <h2 className="mb-6 text-2xl font-bold">
        {name}님의 투자성향은
        <br />
        <span className="text-primary-normal">{userPropensity.propensity}</span>입니다.
      </h2>
      {userPropensity && <PropensityInfoCard propensity={propensity} info={userPropensity.info} />}
      <PropensityChart propensity={userPropensity.propensity} />
      <RiskGrades grade={userPropensity.grade} />
      <RecommendPBList list={list} />
    </>
  );
}

export default HydratePropensity;
