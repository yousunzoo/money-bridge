"use client";
import BubbleSection from "@/components/reservationPage/BubbleSection";
import { useState } from "react";
import reservationInfo from "@/mocks/seon/reservationInfo.json";
import SelectTimeModal from "@/components/reservationPage/SelectTimeModal";
import ForwardingModal from "@/components/reservationPage/ForwardingModal";
import ModalLayout from "@/components/reservationPage/ModalLayout";
import EditProfileModal from "@/components/reservationPage/EditProfileModal";

function ReservationPage() {
  const { pbName, pbStation, consultTime, userInfo } = reservationInfo.data;
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [isChecked, setIsChecked] = useState<{ [key: number]: boolean }>({});
  const [isPhoneConsult, setIsPhoneConsult] = useState(false);
  const handleOpenModal = (nowStep: number) => {
    setStep(nowStep);
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const moveToNextStep = (nowStep: number) => {
    setStep(step + 1);
    setIsChecked({ ...isChecked, [nowStep]: true });
  };
  const skipNextStep = () => {
    setIsPhoneConsult(true);
    setStep(step + 2);
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
      </div>
      {isOpen && (
        <ModalLayout>
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
