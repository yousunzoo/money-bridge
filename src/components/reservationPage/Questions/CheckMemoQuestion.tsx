import { ICheckMemoQuestion } from "@/types/reservation";
import { useReservationStore } from "@/store/reservationStore";
import UserBubble from "../UserBubble/UserBubble";
import { useSetQuestions } from "@/hooks/useSetQuestions";
import highlight from "/public/assets/images/highlight.svg";
import Image from "next/image";

function CheckMemoQuestion({ isOpen, handleOpenModal, moveToNextStep }: ICheckMemoQuestion) {
  const { nowQuestion, isChoosable, setIsChoosable, sectionRef, answerRef } = useSetQuestions(4, isOpen);
  const { answers, setAnswers } = useReservationStore();
  const { intro1, intro2, question, options } = nowQuestion;

  const handleClick = (option: string) => {
    if (option === "네(작성하기)") {
      if (!handleOpenModal) return;
      handleOpenModal(4);
      return;
    }

    setIsChoosable(false);
    setAnswers(4, option);
    moveToNextStep(4);
  };

  return (
    <section ref={sectionRef} className={`${isChoosable && answers[4] && "pt-20"} flex h-screen flex-col pb-10`}>
      {isChoosable && <Image className="mb-2" src={highlight} alt="highlight" width={24} height={24} />}
      {intro1 && isChoosable && (
        <div className="text-lg mb-4 break-keep font-semibold">
          <p>{intro1}</p>
          {intro2 && <p>{intro2}</p>}
        </div>
      )}

      <div className="pb-4">
        <div>
          <p className="text-lg font-bold">{question}</p>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {isChoosable &&
            options.map((option, idx) => (
              <button onClick={() => handleClick(option)} className="option" key={idx}>
                {option}
              </button>
            ))}
        </div>
      </div>
      {answers[4] && !isChoosable && (
        <UserBubble answerRef={answerRef} step={4} answers={answers} setIsChoosable={setIsChoosable} />
      )}
    </section>
  );
}

export default CheckMemoQuestion;
