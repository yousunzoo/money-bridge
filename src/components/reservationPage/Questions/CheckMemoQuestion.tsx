import { ICheckMemoQuestion } from "@/types/reservation";
import { useReservationStore } from "@/store/reservationStore";
import UserBubble from "../UserBubble/UserBubble";
import { useSetQuestions } from "@/hooks/useSetQuestions";

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
      {answers[4] && !isChoosable && (
        <UserBubble answerRef={answerRef} step={4} answers={answers} setIsChoosable={setIsChoosable} />
      )}
    </section>
  );
}

export default CheckMemoQuestion;
