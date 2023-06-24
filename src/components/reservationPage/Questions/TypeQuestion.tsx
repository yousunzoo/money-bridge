import { ITypeQuestionProps } from "@/types/reservation";
import { useSetQuestions } from "@/hooks/useSetQuestions";
import UserBubble from "../UserBubble/UserBubble";

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
    <section ref={sectionRef} className="flex h-screen flex-col pb-10">
      <div className={`${isChoosable ? "pt-12" : "pt-4"}`} />
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
