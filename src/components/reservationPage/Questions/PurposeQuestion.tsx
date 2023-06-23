import { IPurposeQuestionProps } from "@/types/reservation";
import { useSetQuestions } from "@/hooks/useSetQuestions";
import UserBubble from "../UserBubble/UserBubble";

function PurposeQuestion({ moveToNextStep }: IPurposeQuestionProps) {
  const { nowQuestion, isChoosable, setIsChoosable, sectionRef, answerRef, answers, setAnswers } = useSetQuestions(0);
  const { intro1, intro2, question, options } = nowQuestion;

  const handleClick = (option: string) => {
    setIsChoosable(false);

    setAnswers(0, option);

    moveToNextStep(0);
    return;
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
            options.map((option, idx) => (
              <button onClick={() => handleClick(option)} className="option" key={idx}>
                {option}
              </button>
            ))}
        </div>
      </div>
      {answers[0] && !isChoosable && (
        <UserBubble answerRef={answerRef} step={0} answers={answers} setIsChoosable={setIsChoosable} />
      )}
    </section>
  );
}

export default PurposeQuestion;
