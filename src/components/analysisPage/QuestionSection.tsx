import { useAnalysisStore } from "@/store/analysisStore";
import { IQuestionSectionProps } from "@/types/analysis";
import Image from "next/image";
import editIcon from "/public/assets/images/editIcon.svg";
import { MouseEvent, useEffect, useRef, useState } from "react";
import highlight from "/public/assets/images/highlight.svg";

function QuestionSection({ nowStep, nowQuestion, moveToNextStep }: IQuestionSectionProps) {
  const { answers } = useAnalysisStore();
  const [isChoosable, setIsChoosable] = useState(true);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const answerRef = useRef<HTMLDivElement | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  useEffect(() => {
    if (!sectionRef.current || !answerRef.current) return;
    if (!isChoosable && nowStep === 5) {
      sectionRef.current.classList.remove("h-screen");

      return;
    }
    if (!isChoosable) {
      sectionRef.current.classList.remove("h-screen");
      answerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }
    if (answers[nowStep as 0 | 1 | 2 | 3 | 4 | 5] && isChoosable) {
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
    <section ref={sectionRef} className={`flex h-screen flex-col ${isChoosable && "pt-10"}`}>
      <div className="pt-10" />
      {isChoosable && <Image src={highlight} className="mb-2" alt="highlight" width={24} height={24} />}
      {intro1 && isChoosable && <div className="text-lg mb-4 font-semibold">{intro2 && <p>{intro2}</p>}</div>}
      <div className="pb-4">
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
      <div
        className={`${
          isChoosable ? "grow" : answers[(nowStep + 1) as 1 | 2 | 3 | 4 | 5] || nowStep === 5 ? "h-0" : "h-20"
        }`}
        ref={answerRef}
      />
      {!isChoosable && (
        <>
          <div className="user_bubble flex gap-2">{<p>{answer}</p>}</div>
          <button onClick={() => setIsChoosable(true)} className="mt-2 flex items-center gap-2 self-end text-xs">
            <Image src={editIcon} width={16} height={16} alt="수정하기" />
            <span>수정하기</span>
          </button>
        </>
      )}
    </section>
  );
}

export default QuestionSection;
