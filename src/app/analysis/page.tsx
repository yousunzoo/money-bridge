"use client";
import QuestionSection from "@/components/analysisPage/QuestionSection";
import TopNav from "@/components/common/TopNav";
import analysisQuestions from "@/constants/propensityCheckQuestions.json";
import { useCheckPropensity } from "@/hooks/useCheckPropensity";
import { useAnalysisStore } from "@/store/analysisStore";
import { IAnalysisQuestions } from "@/types/analysis";
import { convertAnalysisAnswers } from "@/utils/convertAnswer";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { getLoginedUserInfo } from "../apis/services/auth";
import { AxiosError } from "axios";
import highlight from "/public/assets/images/highlight.svg";
import Image from "next/image";
import { ILoginedUserInfo } from "@/types/common";
function AnalysisPage() {
  const questions: IAnalysisQuestions = analysisQuestions;
  const [step, setStep] = useState(0);
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery<ILoginedUserInfo, AxiosError>(["loginedUserInfo"], getLoginedUserInfo);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { answers, setAnswers } = useAnalysisStore();
  const registerPropensity = useCheckPropensity();
  const moveToNextStep = (nowStep: number, answer: string) => {
    setStep(nowStep + 1);
    setAnswers(nowStep, answer);
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    if (step > 5) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [step]);

  const handleSubmit = () => {
    const score = convertAnalysisAnswers(answers);
    registerPropensity(score);
  };

  return (
    <>
      <TopNav title="투자 성향 알아보기" hasBack={true} />
      <div className={`${answers[5] && "pb-40 pt-10"} mx-auto max-w-[600px]`} ref={sectionRef}>
        <section className="flex flex-col gap-y-4">
          <div className="font-bold">
            <Image src={highlight} className="mb-2" alt="highlight" width={24} height={24} />
            {answers[5] ? (
              <>
                <p>{userData?.name}의 투자 성향 응답이에요.</p>
                <p>MONEY BRIDGE 에서 잘 분석해 드릴게요.</p>
              </>
            ) : (
              <>
                <p>{userData?.name}님,</p>
                <p>MONEY BRIDGE에 오신 것을 환영합니다!</p>
                <p>단 1분 만에 나의 투자 성향을 분석할 수 있어요.</p>
                <p>저와 함께 작성해볼까요?</p>
              </>
            )}
          </div>
          <div className="user_bubble">
            <p>네! 좋아요</p>
          </div>
        </section>
        <QuestionSection nowStep={0} nowQuestion={questions[0]} moveToNextStep={moveToNextStep} />
        {answers[0] && <QuestionSection nowStep={1} nowQuestion={questions[1]} moveToNextStep={moveToNextStep} />}
        {answers[1] && <QuestionSection nowStep={2} nowQuestion={questions[2]} moveToNextStep={moveToNextStep} />}
        {answers[2] && <QuestionSection nowStep={3} nowQuestion={questions[3]} moveToNextStep={moveToNextStep} />}
        {answers[3] && <QuestionSection nowStep={4} nowQuestion={questions[4]} moveToNextStep={moveToNextStep} />}
        {answers[4] && <QuestionSection nowStep={5} nowQuestion={questions[5]} moveToNextStep={moveToNextStep} />}
      </div>
      {answers[5] && (
        <button className="button_fixed" onClick={handleSubmit}>
          등록하기
        </button>
      )}
    </>
  );
}

export default AnalysisPage;
