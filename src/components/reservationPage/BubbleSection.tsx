import { IQuestions } from "@/types/reservation";
import reservationQuestions from "@/constants/reservationQuestions.json";
import { MouseEvent, useState } from "react";
import { IBubbleSectionProps } from "@/types/common";

function BubbleSection({ step, answers, setAnswers, moveToNextStep }: IBubbleSectionProps) {
  const questions: IQuestions = reservationQuestions;
  const { question, intro1, intro2, intro3, sub, options } = questions[step];
  const [isMovable, SetIsMovable] = useState(false);
  const [tempAns, setTempAns] = useState<string[]>([]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>, option: string) => {
    if (step !== 0) {
      setAnswers({ ...answers, [step]: option });
      moveToNextStep();
      return;
    }

    const { classList, textContent } = e.currentTarget;
    if (!textContent) return;
    if (tempAns.includes(textContent)) {
      if (tempAns.length === 1) SetIsMovable(false);
      setTempAns(tempAns.filter(element => element !== textContent));
      classList.add("bg-white");
      classList.remove("bg-black", "text-white");
    } else {
      if (tempAns.length === 2) return;
      SetIsMovable(true);
      classList.remove("bg-white");
      classList.add("bg-black", "text-white");
      setTempAns([...tempAns, textContent]);
    }
  };

  const handleNextButton = () => {
    setAnswers({ ...answers, 0: tempAns });
    moveToNextStep();
  };
  return (
    <section className="mb-4 flex flex-col gap-y-4">
      {intro1 && (
        <div className="chatBubble">
          <p>{intro1}</p>
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
          {options.map((option, idx) => (
            <button
              onClick={e => handleClick(e, option)}
              className="w-fit rounded-2xl border-2 border-black bg-white px-2 py-1"
              key={idx}
            >
              {option}
            </button>
          ))}
          {isMovable && (
            <button onClick={handleNextButton} className="w-fit self-end rounded-2xl bg-black px-2 py-1 text-white">
              선택완료
            </button>
          )}
        </div>
      </div>
      {step === 0 && answers[0] && <div className="userBubble">{answers[0].join(", ")}</div>}
      {step > 0 && answers[step] && <div className="userBubble">{answers[step]}</div>}
    </section>
  );
}

export default BubbleSection;
