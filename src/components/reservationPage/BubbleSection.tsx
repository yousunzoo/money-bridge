import { IBubbleSectionProps, IQuestions } from "@/types/reservation";
import reservationQuestions from "@/constants/reservationQuestions.json";
import { MouseEvent, useEffect, useRef, useState } from "react";
import LocationCard from "../common/LocationCard";
import { useReservationStore } from "@/store/reservationStore";
import UserBubble from "./UserBubble/UserBubble";
import LocationCopyButton from "../common/LocationCopyButton";
function BubbleSection({
  step,
  isOpen,
  pbStation,
  consultTime,
  userInfo,
  handleOpenModal,
  skipNextStep,
  moveToNextStep,
}: IBubbleSectionProps) {
  const questions: IQuestions = reservationQuestions;

  const { question, intro1, intro2, options } = questions[step];

  const [isChoosable, setIsChoosable] = useState(true);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const questionRef = useRef<HTMLDivElement | null>(null);
  const { answers, setAnswers } = useReservationStore();

  const editedInfo = userInfo ? (isChoosable ? userInfo : answers[5]) : null;

  const handleClick = (e: MouseEvent<HTMLButtonElement>, option: string) => {
    const { textContent } = e.target as HTMLElement;
    if (step === 3) {
      if (!handleOpenModal) return;
      handleOpenModal(step);
      return;
    }

    if (textContent === "네(작성하기)" || textContent === "틀립니다(정보 수정)") {
      if (!handleOpenModal) return;
      handleOpenModal(step);
      return;
    }

    setIsChoosable(false);

    if (textContent === "맞습니다") {
      if (!editedInfo) return;
      setAnswers(step, editedInfo);
      moveToNextStep(step);
      return;
    }
    setAnswers(step, option);

    if (textContent === "언제 어디든 쉽고 빠르게 전화 상담") {
      if (!skipNextStep) return;
      skipNextStep();
      return;
    }
    moveToNextStep(step);
    return;
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    if (!isChoosable && step === 5) {
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
    if (step !== 0 && isChoosable) {
      sectionRef.current.classList.add("h-screen");
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }
  }, [isChoosable]);

  useEffect(() => {
    if (answers[step] && !isOpen) {
      setIsChoosable(false);
    }
  }, [isOpen]);

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
          {pbStation && (
            <div className="info_card">
              <p className="font-bold text-primary-normal">{pbStation.branchName}</p>
              <div className="mb-4 flex w-full justify-between text-xs">
                <p>{pbStation.branchAddress}</p>
                <LocationCopyButton location={pbStation.branchAddress} />
              </div>
              <LocationCard latitude={pbStation.branchLatitude} longitude={pbStation.branchLongitude} />
            </div>
          )}
          {consultTime && (
            <div className="info_card">
              <p className="font-bold">상담 가능 시간을 확인해주세요.</p>
              <p>
                업무시간 : 월~금 {consultTime.consultStart} ~ {consultTime.consultEnd}
              </p>
              {consultTime.notice && <p>유의사항 : {consultTime.notice}</p>}
            </div>
          )}
          {editedInfo && (
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
          )}
          {isChoosable &&
            options.map((option, idx) => (
              <button onClick={e => handleClick(e, option)} className="option" key={idx}>
                {option}
              </button>
            ))}
        </div>
      </div>
      {!answers[step] && <div className="grow" />}
      {/* {answers[step] && !isChoosable && (
        <UserBubble step={step} answers={answers[step]} setIsChoosable={setIsChoosable} />
      )} */}
    </section>
  );
}

export default BubbleSection;
