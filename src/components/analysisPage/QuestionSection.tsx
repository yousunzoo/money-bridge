import { useAnalysisStore } from "@/store/analysisStore";
import { IQuestionSectionProps } from "@/types/analysis";
import React, { MouseEvent, useEffect, useRef, useState } from "react";

function QuestionSection({ nowStep, nowQuestion, moveToNextStep }: IQuestionSectionProps) {
  const [isChoosable, setIsChoosable] = useState(true);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const questionRef = useRef<HTMLDivElement | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    if (!isChoosable && nowStep === 5) {
      sectionRef.current.classList.remove("h-screen");

      return;
    }
    if (!isChoosable) {
      sectionRef.current.classList.remove("h-screen");
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }
    if (nowStep !== 0 && isChoosable) {
      sectionRef.current.classList.add("h-screen");
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }
  }, [isChoosable]);

  if (!nowQuestion) return null;

  const { question, options, intro1, intro2 } = nowQuestion;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { textContent } = e.target as HTMLElement;
    if (!textContent) return;
    moveToNextStep(nowStep, textContent);
    setIsChoosable(false);
    setAnswer(textContent);
  };

  return (
    <section ref={sectionRef} className="flex h-screen flex-col pb-10">
      <div className={`${isChoosable ? "pt-12" : "pt-4"}`} ref={questionRef} />
      {intro1 && isChoosable && <div className="text-lg mb-10 font-semibold">{intro2 && <p>{intro2}</p>}</div>}
      <div className="pb-5">
        <div>
          <p className="text-lg font-bold">{question}</p>
        </div>
        <div className="mt-5 flex flex-col gap-4">
          {isChoosable &&
            options.map((option, idx) => (
              <button className="option" key={idx} onClick={handleClick}>
                {option}
              </button>
            ))}
        </div>
      </div>
      {isChoosable && <div className="grow" />}
      {!isChoosable && (
        <div className="user_bubble flex gap-2">
          {<p>{answer}</p>}
          <button onClick={() => setIsChoosable(true)}>✏️</button>
        </div>
      )}
    </section>
  );
}

export default QuestionSection;
