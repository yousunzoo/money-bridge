import { useReservationStore } from "@/store/reservationStore";
import { ITimeSelectQuestionProps, IQuestions } from "@/types/reservation";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import reservationQuestions from "@/constants/reservationQuestions.json";
import UserBubble from "../UserBubble/UserBubble";
import { useSetQuestions } from "@/hooks/useSetQuestions";
function TimeSelectQuestion({ isOpen, consultTime, handleOpenModal }: ITimeSelectQuestionProps) {
  const { nowQuestion, isChoosable, setIsChoosable, sectionRef, answerRef, answers } = useSetQuestions(3);
  const { intro1, intro2, question, options } = nowQuestion;
  const { consultStart, consultEnd, notice } = consultTime;

  const handleClick = () => {
    if (!handleOpenModal) return;
    handleOpenModal(3);
  };

  useEffect(() => {
    if (answers[3]?.candidateTime1) {
      setIsChoosable(false);
    }
  }, [isChoosable, answers]);

  return (
    <section ref={sectionRef} className="flex h-screen flex-col pb-10">
      <div className={`${isChoosable ? "pt-8" : "pt-4"}`} />
      {intro1 && isChoosable && (
        <div className="text-lg mb-10 font-semibold">
          <p>{intro1}</p>
          {intro2 && <p>{intro2}</p>}
        </div>
      )}

      <div className="pb-5">
        <div>
          <p className="text-lg font-bold">{question}</p>
        </div>
        <div className="mt-5 flex flex-col gap-4">
          <div className="info_card">
            <p className="font-bold">상담 가능 시간을 확인해주세요.</p>
            <p>
              업무시간 : 월~금 {consultStart} ~ {consultEnd}
            </p>
            {notice && <p>유의사항 : {notice}</p>}
          </div>

          {isChoosable &&
            options.map((option, idx) => (
              <button onClick={handleClick} className="option" key={idx}>
                {option}
              </button>
            ))}
        </div>
      </div>
      {answers[3] && !isChoosable && (
        <UserBubble answerRef={answerRef} step={3} answers={answers} setIsChoosable={setIsChoosable} />
      )}
    </section>
  );
}

export default TimeSelectQuestion;
