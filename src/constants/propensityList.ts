import { IPropensityList } from "@/types/pblist";

export const propensityList: IPropensityList = {
  CONSERVATIVE: {
    bar: 1,
    propensity: "안전형",
    lossRisk: "매우낮음",
    pursuit: "확정적인 수익 추구",
    productRisk: "매우 낮은 위험 6등급의 위험도 상품 선호",
  },
  CAUTIOUS: {
    bar: 2,
    propensity: "안전추구형",
    lossRisk: "낮음",
    pursuit: "안정적인 수익 추구",
    productRisk: "낮은 위험 5등급의 위험도 상품 선호",
  },
  BALANCED: {
    bar: 3,
    propensity: "위험중립형",
    lossRisk: "약간 높음",
    pursuit: "예적금보다 높은 수익 추구",
    productRisk: "보통 위험 4등급의 위험도 상품 선호",
  },
  AGGRESSIVE: {
    bar: 4,
    propensity: "적극형",
    lossRisk: "높음",
    pursuit: "높은 수준의 수익 추구",
    productRisk: "다소 높은 3등급의 위험도 상품 선호",
  },
  SPECULATIVE: {
    bar: 5,
    propensity: "공격형",
    lossRisk: "매우 높음",
    pursuit: "예적금을 훨씬 넘어서는 높은 수익 추구",
    productRisk: "매우 높은 혹은 높은 1-2등급의 위험도 상품 선호",
  },
};

export const propensityDetailedList = {
  CONSERVATIVE: {
    grade: "6",
    propensity: "안전형",
    info: [
      "원금 손실 위험 피함",
      "이자/배당 소득 수준의 확정적인 수익 추구",
      "매우 낮은 위험 6등급의 위험도의 상품 선호",
    ],
  },
  CAUTIOUS: {
    grade: "5",
    propensity: "안전추구형",
    info: ["원금 손실 위험 최소화", "이자/배당 소득 수준의 안정적인 수익 추구", "낮은 위험 5등급의 위험도의 상품 선호"],
  },
  BALANCED: {
    grade: "4",
    propensity: "위험중립형",
    info: ["일정 수준의 손실 위험 감수", "예적금보다 높은 수익 추구", "보통 위험 4등급의 위험도의 상품 선호"],
  },
  AGGRESSIVE: {
    grade: "3",
    propensity: "적극형",
    info: ["위험 감수", "높은 수준의 수익 추구", "다소 높은 위험 3등급의 위험도 상품 선호"],
  },
  SPECULATIVE: {
    grade: "1~2",
    propensity: "공격형",
    info: [
      "위험 적극 수용",
      "예적금을 훨씬 넘어서는 높은 수익 추구",
      "매우 높은 혹은 높은 1~2 등급의 위험도 상품 선호",
    ],
  },
};

export const riskRating = [
  { grade: "1~2", info: "매우 높은, 높은 위험", volatility: "24% 초과/이하" },
  { grade: "3", info: "다소 높은 위험", volatility: "15% 이하" },
  { grade: "4", info: "보통 위험", volatility: "10% 이하" },
  { grade: "5", info: "낮은 위험", volatility: "5% 이하" },
  { grade: "6", info: "매우 낮은 위험", volatility: "0.5% 이하" },
];

export const propensityChart = [
  { name: "안정형", volatility: 0.5 },
  { name: "안정추구형", volatility: 5 },
  { name: "위험중립형", volatility: 10 },
  { name: "적극형", volatility: 15 },
  { name: "공격형", volatility: 24 },
];
