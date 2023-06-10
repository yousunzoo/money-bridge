"use client";
import BubbleSection from "@/components/reservationPage/BubbleSection";
import { useEffect, useRef, useState } from "react";
import reservationInfo from "@/mocks/seon/reservationInfo.json";
import SelectTimeModal from "@/components/reservationPage/SelectTimeModal";
import ForwardingModal from "@/components/reservationPage/ForwardingModal";
import ModalLayout from "@/components/reservationPage/ModalLayout";
import EditProfileModal from "@/components/reservationPage/EditProfileModal";
import { convertReservationAnswer } from "@/utils/convertAnswer";
import { useReservationStore } from "@/store/reservationStore";
import { useRouter } from "next/navigation";

function ReservationPage() {
  const { pbName, pbStation, consultTime, userInfo } = reservationInfo.data;
  const { answers, resetAnswers } = useReservationStore();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [isChecked, setIsChecked] = useState<{ [key: number]: boolean }>({});
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
    setStep(nowStep + 1);
    setIsChecked({ ...isChecked, [nowStep]: true });
  };
  const skipNextStep = () => {
    setIsPhoneConsult(true);
    setStep(step + 2);
  };
  const handleSubmit = () => {
    const convertedAnswers = convertReservationAnswer(answers);
    // 상담 예약 신청 api 호출
    resetAnswers();
    router.replace("/reservation/complete");
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isChecked[5]) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isChecked]);
  return (
    <>
      <div className="w-full p-6 pb-40" ref={sectionRef}>
        <section className="mb-4 flex flex-col gap-y-4">
          {isChecked[5] ? (
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
              <div className="userBubble">
                <p>네! 좋아요</p>
              </div>
            </>
          )}
        </section>
        <BubbleSection step={0} moveToNextStep={moveToNextStep} />
        {isChecked[0] && <BubbleSection step={1} moveToNextStep={moveToNextStep} skipNextStep={skipNextStep} />}
        {isChecked[1] && !isPhoneConsult && (
          <BubbleSection step={2} moveToNextStep={moveToNextStep} pbStation={pbStation} />
        )}
        {(isChecked[2] || isPhoneConsult) && (
          <BubbleSection
            step={3}
            isOpen={isOpen}
            handleOpenModal={handleOpenModal}
            moveToNextStep={moveToNextStep}
            consultTime={consultTime}
          />
        )}
        {isChecked[3] && (
          <BubbleSection step={4} isOpen={isOpen} handleOpenModal={handleOpenModal} moveToNextStep={moveToNextStep} />
        )}
        {isChecked[4] && (
          <BubbleSection
            step={5}
            isOpen={isOpen}
            handleOpenModal={handleOpenModal}
            moveToNextStep={moveToNextStep}
            userInfo={userInfo}
          />
        )}
        {isChecked[5] && (
          <button
            onClick={handleSubmit}
            className="fixed bottom-4 left-0 right-0 mx-auto flex h-[56px] w-[360px] items-center justify-center rounded-lg bg-black text-white"
          >
            등록하기
          </button>
        )}
      </div>
      {isOpen && (
        <ModalLayout handleCloseModal={handleCloseModal}>
          {step === 3 && (
            <SelectTimeModal
              nowStep={3}
              moveToNextStep={moveToNextStep}
              handleCloseModal={handleCloseModal}
              consultTime={consultTime}
            />
          )}
          {step === 4 && (
            <ForwardingModal nowStep={4} moveToNextStep={moveToNextStep} handleCloseModal={handleCloseModal} />
          )}
          {step === 5 && (
            <EditProfileModal
              userInfo={userInfo}
              nowStep={5}
              moveToNextStep={moveToNextStep}
              handleCloseModal={handleCloseModal}
            />
          )}
        </ModalLayout>
      )}
    </>
  );
}

export default ReservationPage;
