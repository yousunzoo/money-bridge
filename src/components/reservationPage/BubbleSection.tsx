import { IBubbleSectionProps, IQuestions } from "@/types/reservation";
import reservationQuestions from "@/constants/reservationQuestions.json";
import { MouseEvent, useEffect, useRef, useState } from "react";
import LocationCard from "../common/LocationCard";
import { useReservationStore } from "@/store/reservationStore";

function BubbleSection({ step, pbStation, handleOpenModal, moveToNextStep }: IBubbleSectionProps) {
  const questions: IQuestions = reservationQuestions;
  const { question, intro1, intro2, intro3, sub, options } = questions[step];
  const [isMovable, setIsMovable] = useState(false);
  const [isChoosable, setChoosable] = useState(true);
  const [tempAns, setTempAns] = useState<string[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const questionRef = useRef<HTMLDivElement | null>(null);
  const { answers, setAnswers } = useReservationStore();

  const introMent = intro1?.includes("ans")
    ? step === 1
      ? intro1.replace("ans", (answers[0] as string[]).join(", "))
      : intro1.replace("ans", answers[(step - 1) as 0 | 1 | 2 | 3 | 4 | 5] as string)
    : intro1;

  const handleClick = (e: MouseEvent<HTMLButtonElement>, option: string) => {
    if (step === 3) {
      if (!handleOpenModal) return;
      handleOpenModal();
      return;
    }
    if (step !== 0) {
      setAnswers(step, option);
      setChoosable(false);
      moveToNextStep();
      return;
    }

    const { classList, textContent } = e.currentTarget;
    if (!textContent) return;
    if (tempAns.includes(textContent)) {
      if (tempAns.length === 1) setIsMovable(false);
      setTempAns(tempAns.filter(element => element !== textContent));
      classList.add("bg-white");
      classList.remove("bg-black", "text-white");
    } else {
      if (tempAns.length === 2) return;
      setIsMovable(true);
      classList.remove("bg-white");
      classList.add("bg-black", "text-white");
      setTempAns([...tempAns, textContent]);
    }
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

  const handleNextButton = () => {
    setAnswers(step, tempAns);
    setChoosable(false);
    moveToNextStep();
  };

  return (
    <section ref={sectionRef} className="mb-4 flex h-screen flex-col gap-y-4">
      {intro1 && (
        <div className="chatBubble">
          <p>{introMent}</p>
        </div>
      )}
      {intro2 && (
        <div className="chatBubble">
          <p>{intro2}</p>
        </div>
      )}
      {intro3 && (
        <div className="chatBubble">
          <p>{intro3}</p>
        </div>
      )}
      <div className="chatBubble !w-full">
        <div className="mb-4">
          <p className="text-lg font-semibold">{question}</p>
          {sub && <p className="mt-4">{sub}</p>}
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
          {isMovable && isChoosable && (
            <button onClick={handleNextButton} className="w-fit self-end rounded-2xl bg-black px-2 py-1 text-white">
              선택완료
            </button>
          )}
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
      {step === 0 && answers[0] && <div className="userBubble">{answers[0].join(", ")}</div>}
      {step > 0 && answers[step] && <div className="userBubble">{answers[step]}</div>}
    </section>
  );
}

export default BubbleSection;
