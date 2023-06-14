"use client";
import BubbleSection from "@/components/reservationPage/BubbleSection";
import reservationQuestions from "@/constants/reservationQuestions.json";
import { useEffect, useRef, useState } from "react";
import reservationInfo from "@/mocks/seon/reservationInfo.json";
import SelectTimeModal from "@/components/reservationPage/SelectTimeModal";
import ForwardingModal from "@/components/reservationPage/ForwardingModal";
import ModalLayout from "@/components/reservationPage/ModalLayout";
import EditProfileModal from "@/components/reservationPage/EditProfileModal";
import { convertReservationAnswer } from "@/utils/convertAnswer";
import { useReservationStore } from "@/store/reservationStore";
import { useRouter } from "next/navigation";
import { IQuestions } from "@/types/reservation";

function ReservationPage() {
  const questions: IQuestions = reservationQuestions;
  const { pbName, pbStation, consultTime, userInfo } = reservationInfo.data;
  const { answers, resetAnswers } = useReservationStore();
  const [step, setStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isPhoneConsult, setIsPhoneConsult] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleOpenModal = (nowStep: number) => {
    setStep(nowStep);
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const moveToNextStep = (nowStep: number) => {
    if (nowStep === 1) {
      setIsPhoneConsult(false);
    }
    setStep(nowStep + 1);
  };
  const skipNextStep = () => {
    setIsPhoneConsult(true);
    setStep(step + 2);
  };
  const handleSubmit = () => {
    const convertedAnswers = convertReservationAnswer(answers);
    // 상담 예약 신청 api 호출
    router.replace("/reservation/complete");
    resetAnswers();
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    if (answers[5]) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [answers]);

  return (
    <>
      <div className="w-full pb-40 pt-20" ref={sectionRef}>
        <section className="mb-4 flex flex-col gap-y-4">
          {answers[5] ? (
            <div className="text-lg font-semibold">
              <p>{userInfo.userName}님의 상담 예약 응답이에요.</p>
              <p>PB님께 잘 전달해 드릴게요.</p>
            </div>
          ) : (
            <>
              <div className="text-lg font-semibold">
                <p>
                  {userInfo.userName}님,
                  <br />
                  {pbName} PB님과 찐하고 담백한 상담하기 위해
                  <br />
                  저와 함께 예약을 시작해볼까요?
                </p>
              </div>
              <div className="user_bubble">
                <p>네! 좋아요</p>
              </div>
            </>
          )}
        </section>
        <BubbleSection nowQuestion={questions[0]} step={0} moveToNextStep={moveToNextStep} />
        {answers[0] && (
          <BubbleSection
            step={1}
            nowQuestion={questions[1]}
            moveToNextStep={moveToNextStep}
            skipNextStep={skipNextStep}
          />
        )}
        {answers[1] && !isPhoneConsult && (
          <BubbleSection step={2} nowQuestion={questions[2]} moveToNextStep={moveToNextStep} pbStation={pbStation} />
        )}
        {(answers[2] || isPhoneConsult) && (
          <BubbleSection
            step={3}
            nowQuestion={questions[3]}
            isOpen={isOpen}
            handleOpenModal={handleOpenModal}
            moveToNextStep={moveToNextStep}
            consultTime={consultTime}
          />
        )}
        {answers[3] && (
          <BubbleSection
            step={4}
            nowQuestion={questions[4]}
            isOpen={isOpen}
            handleOpenModal={handleOpenModal}
            moveToNextStep={moveToNextStep}
          />
        )}
        {answers[4] && (
          <BubbleSection
            step={5}
            nowQuestion={questions[5]}
            isOpen={isOpen}
            handleOpenModal={handleOpenModal}
            moveToNextStep={moveToNextStep}
            userInfo={userInfo}
          />
        )}
        {answers[5] && (
          <button onClick={handleSubmit} className="button_fixed">
            등록하기
          </button>
        )}
      </div>
      {isOpen && (
        <ModalLayout handleCloseModal={handleCloseModal}>
          {step === 3 && (
            <SelectTimeModal
              moveToNextStep={moveToNextStep}
              handleCloseModal={handleCloseModal}
              consultTime={consultTime}
            />
          )}
          {step === 4 && <ForwardingModal moveToNextStep={moveToNextStep} handleCloseModal={handleCloseModal} />}
          {step === 5 && (
            <EditProfileModal userInfo={userInfo} moveToNextStep={moveToNextStep} handleCloseModal={handleCloseModal} />
          )}
        </ModalLayout>
      )}
    </>
  );
}

export default ReservationPage;
