"use client";
import analysisQuestions from "@/constants/propensityCheckQuestions.json";
import { useState } from "react";

function AnalysisPage() {
  const [step, setStep] = useState(0);

  return (
    <>
      <section>
        <div className="font-bold">
          <p>홍길동님,</p>
          <p>MONEY BRIDGE에 오신 것을 환영합니다!</p>
          <p>단 1분 만에 나의 투자 성향을 분석할 수 있어요.</p>
          <p>저와 함께 작성해볼까요?</p>
        </div>
      </section>
    </>
  );
}

export default AnalysisPage;
