import { IPurposeQuestionProps } from "@/types/reservation";
import { useSetQuestions } from "@/hooks/useSetQuestions";
import UserBubble from "../UserBubble/UserBubble";
import highlight from "/public/assets/images/highlight.svg";
import Image from "next/image";

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
