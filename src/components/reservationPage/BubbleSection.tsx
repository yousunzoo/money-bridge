import { IBubbleSectionProps, IQuestions } from "@/types/reservation";
import reservationQuestions from "@/constants/reservationQuestions.json";
import { MouseEvent, useEffect, useRef, useState } from "react";
import LocationCard from "../common/LocationCard";
import { useReservationStore } from "@/store/reservationStore";

function BubbleSection({ step, pbStation, handleOpenModal, moveToNextStep }: IBubbleSectionProps) {
  const questions: IQuestions = reservationQuestions;
  const { question, intro1, intro2, options } = questions[step];
  const [isChoosable, setIsChoosable] = useState(true);
  const [tempAns, setTempAns] = useState<string[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const questionRef = useRef<HTMLDivElement | null>(null);
  const { answers, setAnswers } = useReservationStore();

  const handleClick = (e: MouseEvent<HTMLButtonElement>, option: string) => {
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

    if (!isChoosable) {
      sectionRef.current.classList.remove("h-screen");
      questionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [sectionRef, questionRef, isChoosable]);

  return (
    <section ref={sectionRef} className="mb-4 flex h-screen flex-col gap-y-4">
      {intro1 && (
        <div className="chatBubble">
          <p>{intro1}</p>
        </div>
      )}

      <div className="chatBubble !w-full">
        <div className="mb-4">
          <p className="text-lg font-semibold">{question}</p>
        </div>
        <div className="flex flex-col gap-3">
          {isChoosable &&
            options.map((option, idx) => (
              <button
                onClick={e => handleClick(e, option)}
                className="w-fit rounded-2xl border-2 border-black bg-white px-2 py-1"
                key={idx}
              >
                {option}
              </button>
            ))}
        </div>
        {pbStation && (
          <div>
            <p>PB 소속 지점 위치</p>
            <p>{pbStation.branchName}</p>
            <p>{pbStation.branchAddress}</p>
            <LocationCard lat={pbStation.branchLatitude} lng={pbStation.branchLongitude} closeButton={false} />
          </div>
        )}
      </div>
      <div ref={questionRef}></div>
      {!answers[step] && <div className="grow"></div>}
      {step === 3 && answers[3] && <div className="userBubble"></div>}
      {answers[step] && step !== 3 && <div className="userBubble">{answers[step]}</div>}
    </section>
  );
}

export default BubbleSection;
