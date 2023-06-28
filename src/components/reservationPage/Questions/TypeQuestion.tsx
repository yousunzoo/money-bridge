import { ITypeQuestionProps } from "@/types/reservation";
import { useSetQuestions } from "@/hooks/useSetQuestions";
import UserBubble from "../UserBubble/UserBubble";
import highlight from "/public/assets/images/highlight.svg";
import Image from "next/image";

function TypeQuestion({ skipNextStep, moveToNextStep }: ITypeQuestionProps) {
  const { nowQuestion, isChoosable, setIsChoosable, sectionRef, answerRef, answers, setAnswers } = useSetQuestions(1);
  const { question, intro1, intro2, options } = nowQuestion;

  const handleClick = (option: string) => {
    setIsChoosable(false);
    setAnswers(1, option);

    if (option === "언제 어디든 쉽고 빠르게 전화 상담") {
      if (!skipNextStep) return;
      skipNextStep();
      return;
    }
    moveToNextStep(1);
  };

  return (
    <section ref={sectionRef} className={`${isChoosable && answers[0] && "pt-20"} flex h-screen flex-col pb-10`}>
      {isChoosable && <Image className="mb-2" src={highlight} alt="highlight" width={24} height={24} />}
      {intro1 && isChoosable && (
        <div className="text-lg mb-4 font-semibold">
          <p>{intro1}</p>
          {intro2 && <p>{intro2}</p>}
        </div>
      )}

      <div className="pb-4">
        <p className="text-lg font-bold">{question}</p>
        <div className="mt-4 flex flex-col gap-4">
          {isChoosable &&
            options.map(option => (
              <button onClick={() => handleClick(option)} className="option" key={option}>
                {option}
              </button>
            ))}
        </div>
      </div>
      {answers[1] && !isChoosable && (
        <UserBubble answerRef={answerRef} step={1} answers={answers} setIsChoosable={setIsChoosable} />
      )}
    </section>
  );
}

export default TypeQuestion;
