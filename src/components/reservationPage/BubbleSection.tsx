import { IBubbleSectionProps, IQuestions } from "@/types/reservation";
import reservationQuestions from "@/constants/reservationQuestions.json";
import { MouseEvent, useEffect, useRef, useState } from "react";
import LocationCard from "../common/LocationCard";
import { useReservationStore } from "@/store/reservationStore";
import CandidateTime from "./CandidateTime";

function BubbleSection({ step, isOpen, pbStation, consultTime, handleOpenModal, moveToNextStep }: IBubbleSectionProps) {
  const questions: IQuestions = reservationQuestions;
  const { question, intro1, intro2, options } = questions[step];
  const [isChoosable, setIsChoosable] = useState(true);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const questionRef = useRef<HTMLDivElement | null>(null);
  const { answers, setAnswers } = useReservationStore();

  const handleClick = (option: string) => {
    if (step === 3) {
      if (!handleOpenModal) return;
      handleOpenModal();
      return;
    }

    setAnswers(step, option);
    setIsChoosable(false);
    moveToNextStep();
    return;
  };

  useEffect(() => {
    if (!sectionRef.current || !questionRef.current) return;
    if (answers[step] && !isOpen) {
      setIsChoosable(false);
    }
    if (!isChoosable) {
      sectionRef.current.classList.remove("h-screen");
      questionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [sectionRef, questionRef, isChoosable, isOpen]);

  return (
    <section ref={sectionRef} className="mb-6 flex h-screen flex-col gap-y-4">
      {intro1 && (
        <div className="text-lg font-semibold">
          <p>{intro1}</p>
          {intro2 && <p>{intro2}</p>}
        </div>
      )}

      <div className="!w-full">
        <div className="mb-4">
          <p className="text-lg font-semibold">{question}</p>
        </div>
        <div className="flex flex-col gap-3">
          {pbStation && (
            <div className="w-full rounded-3xl border-2 p-4">
              <p className="font-semibold">{pbStation.branchName}</p>
              <p>{pbStation.branchAddress}</p>
              <LocationCard lat={pbStation.branchLatitude} lng={pbStation.branchLongitude} closeButton={false} />
            </div>
          )}
          {consultTime && (
            <div className="w-full rounded-3xl border-2 p-4">
              <p className="font-semibold">상담 가능 시간을 확인해주세요.</p>
              <p>
                업무시간 : 월~금 {consultTime.consultStart} ~ {consultTime.consultEnd}
              </p>
              {consultTime.notice && <p>유의사항 : {consultTime.notice}</p>}
            </div>
          )}
          {isChoosable &&
            options.map((option, idx) => (
              <button
                onClick={() => handleClick(option)}
                className="w-fit rounded-3xl border-2 border-black bg-white px-4 py-2"
                key={idx}
              >
                {option}
              </button>
            ))}
        </div>
      </div>
      <div ref={questionRef}></div>
      {!answers[step] && <div className="grow"></div>}
      {step === 3 && answers[3] && <CandidateTime candidates={answers[3]} />}
      {answers[step] && step !== 3 && <div className="userBubble">{answers[step]}</div>}
    </section>
  );
}

export default BubbleSection;
