"use client";
import BubbleSection from "@/components/reservationPage/BubbleSection";
import { useState } from "react";
import reservationInfo from "@/mocks/seon/reservationInfo.json";
import SelectTimeModal from "@/components/reservationPage/SelectTimeModal";

function ReservationPage() {
  const { pbName, pbStation, consultTime, userInfo } = reservationInfo.data;
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const moveToNextStep = () => {
    setStep(step + 1);
  };

  return (
    <>
      <div className="w-full p-6">
        <section className="mb-4 flex flex-col gap-y-4">
          <div className="chatBubble">
            <p>
              {pbName}의 상담예약 페이지입니다!
              <br />
              머니브릿지와 함께 정해보아요~
            </p>
          </div>
          <div className="userBubble">
            <p>네! 좋아요</p>
          </div>
        </section>
        {step >= 0 && <BubbleSection step={0} moveToNextStep={moveToNextStep} />}
        {step >= 1 && <BubbleSection step={1} moveToNextStep={moveToNextStep} />}
        {step >= 2 && <BubbleSection step={2} moveToNextStep={moveToNextStep} pbStation={pbStation} />}
        {step >= 3 && (
          <BubbleSection
            step={3}
            isOpen={isOpen}
            handleOpenModal={handleOpenModal}
            moveToNextStep={moveToNextStep}
            consultTime={consultTime}
          />
        )}
        {step >= 4 && <BubbleSection step={4} moveToNextStep={moveToNextStep} />}
        {step >= 5 && <BubbleSection step={5} moveToNextStep={moveToNextStep} />}
      </div>
      {isOpen && step === 3 && (
        <SelectTimeModal
          moveToNextStep={moveToNextStep}
          handleCloseModal={handleCloseModal}
          consultTime={consultTime}
        />
      )}
    </>
  );
}

export default ReservationPage;
