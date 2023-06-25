import { ICheckQuestionProps, IQuestions } from "@/types/reservation";
import UserBubble from "../UserBubble/UserBubble";
import { useSetQuestions } from "@/hooks/useSetQuestions";
import highlight from "/public/assets/images/highlight.svg";
import Image from "next/image";

function CheckInfoQuestion({ isOpen, userInfo, handleOpenModal, moveToNextStep }: ICheckQuestionProps) {
  const { nowQuestion, isChoosable, setIsChoosable, sectionRef, answerRef, answers, setAnswers } = useSetQuestions(
    5,
    isOpen,
  );
  const { question, intro1, intro2, options } = nowQuestion;

  const editedInfo = answers[5] ? answers[5] : userInfo;

  const handleClick = (option: string) => {
    if (option === "틀립니다(정보 수정)") {
      if (!handleOpenModal) return;
      handleOpenModal(5);
      return;
    }
    setIsChoosable(false);

    if (!editedInfo) return;
    setAnswers(5, editedInfo);
    moveToNextStep(5);
    return;
  };

  return (
    <section ref={sectionRef} className="flex h-screen flex-col pb-10">
      <div className={`${isChoosable ? "pt-12" : "pt-4"}`} />
      {isChoosable && <Image className="mb-2" src={highlight} alt="highlight" width={24} height={24} />}
      {intro1 && isChoosable && (
        <div className="text-lg mb-4 font-semibold">
          <p>{intro1}</p>
          {intro2 && <p>{intro2}</p>}
        </div>
      )}

      <div className="pb-4">
        <div>
          <p className="text-lg font-bold">{question}</p>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <div className="info_card">
            <div className="flex justify-between">
              <p>이름</p>
              <p>{editedInfo.userName}</p>
            </div>
            <div className="flex justify-between">
              <p>휴대폰 번호</p>
              <p>{editedInfo.userPhoneNumber}</p>
            </div>
            <div className="flex justify-between">
              <p>이메일</p>
              <p>{editedInfo.userEmail}</p>
            </div>
          </div>
          {isChoosable &&
            options.map((option, idx) => (
              <button onClick={() => handleClick(option)} className="option" key={idx}>
                {option}
              </button>
            ))}
        </div>
      </div>
      {answers[5] && !isChoosable && (
        <UserBubble answerRef={answerRef} step={5} answers={answers} setIsChoosable={setIsChoosable} />
      )}
    </section>
  );
}

export default CheckInfoQuestion;
