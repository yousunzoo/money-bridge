"use client";
import BubbleSection from "@/components/reservationPage/BubbleSection";
import reservationQuestions from "@/constants/reservationQuestions.json";
import { IQuestions } from "@/types/reservation";
import { useState } from "react";

function ReservationPage() {
  const questions: IQuestions = reservationQuestions;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    step0: null,
    step1: null,
    step2: null,
    step3: null,
    step4: null,
    step5: null,
  });

  const moveToNextStep = () => {
    setStep(step + 1);
  };
  return (
    <div className="w-full p-6">
      <section className="mb-4 flex flex-col gap-y-4">
        <div className="chatBubble">
          <p>
            PB의 상담예약 페이지입니다!
            <br />
            머니브릿지와 함께 정해보아요~
          </p>
        </div>
        <div className="userBubble">
          <p>네! 좋아요</p>
        </div>
      </section>
      {step >= 0 && <BubbleSection questions={questions[0]} moveToNextStep={moveToNextStep} />}
      {step >= 1 && <BubbleSection questions={questions[1]} moveToNextStep={moveToNextStep} />}
      {step >= 2 && <BubbleSection questions={questions[2]} moveToNextStep={moveToNextStep} />}
      {step >= 3 && <BubbleSection questions={questions[3]} moveToNextStep={moveToNextStep} />}
      {step >= 4 && <BubbleSection questions={questions[4]} moveToNextStep={moveToNextStep} />}
    </div>
  );
}

export default ReservationPage;
