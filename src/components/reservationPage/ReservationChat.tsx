import { useEffect, useRef, useState } from "react";
import SelectTimeModal from "@/components/reservationPage/SelectTimeModal";
import { convertReservationAnswer, validateReservationAnswers } from "@/utils/convertAnswer";
import { useReservationStore } from "@/store/reservationStore";
import { IReservationChatProps } from "@/types/reservation";
import TimeSelectQuestion from "./Questions/TimeSelectQuestion";
import LocationQuestion from "./Questions/LocationQuestion";
import CheckInfoQuestion from "./Questions/CheckInfoQuestion";
import CheckMemoQuestion from "./Questions/CheckMemoQuestion";
import PurposeQuestion from "./Questions/PurposeQuestion";
import TypeQuestion from "./Questions/TypeQuestion";
import ModalLayout from "./ModalLayout";
import ForwardingModal from "./Modals/ForwardingModal";
import EditProfileModal from "./Modals/EditProfileModal";
import { useMutation } from "@tanstack/react-query";
import { reserve } from "@/app/apis/services/user";
import { useRouter } from "next/navigation";
import highlight from "/public/assets/images/highlight.svg";
import Image from "next/image";

function ReservationChat({ reservationData, pbId }: IReservationChatProps) {
  const router = useRouter();
  const { answers, setAnswers, resetAnswers } = useReservationStore();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [isPhoneConsult, setIsPhoneConsult] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { mutate: makeReserve } = useMutation(reserve, {
    onSuccess: () => {
      resetAnswers();
      router.replace("/reservation/complete");
    },
  });
  const { userInfo, pbInfo, consultInfo } = reservationData;
  const [validate, setValidate] = useState(false);

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
    setAnswers(2, null);
    setStep(step + 2);
  };
  const handleSubmit = () => {
    const convertedAnswers = convertReservationAnswer(answers);
    makeReserve({ pbId, answers: convertedAnswers });
  };

  const stepModals = {
    3: (
      <SelectTimeModal
        nowStep={3}
        moveToNextStep={moveToNextStep}
        handleCloseModal={handleCloseModal}
        consultTime={consultInfo}
      />
    ),
    4: <ForwardingModal nowStep={4} moveToNextStep={moveToNextStep} handleCloseModal={handleCloseModal} />,
    5: (
      <EditProfileModal
        userInfo={userInfo}
        nowStep={5}
        moveToNextStep={moveToNextStep}
        handleCloseModal={handleCloseModal}
      />
    ),
  };

  useEffect(() => {
    const isValidate = validateReservationAnswers(answers);
    if (isValidate) setValidate(true);
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
      <div className="w-full py-6 pb-20" ref={sectionRef}>
        <section className="mb-10 flex flex-col gap-y-4">
          {answers[5] ? (
            <div className="text-lg font-semibold">
              <Image className="mb-2" src={highlight} alt="highlight" width={24} height={24} />
              <p>{userInfo.userName}님의 상담 예약 응답이에요.</p>
              <p>PB님께 잘 전달해 드릴게요.</p>
            </div>
          ) : (
            <>
              <div className="text-lg font-semibold">
                <Image className="mb-2" src={highlight} alt="highlight" width={24} height={24} />
                <p>
                  {userInfo.userName}님,
                  <br />
                  {pbInfo.pbName} PB님과 찐하고 담백한 상담하기 위해
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
        <PurposeQuestion moveToNextStep={moveToNextStep} />
        {answers[0] && <TypeQuestion moveToNextStep={moveToNextStep} skipNextStep={skipNextStep} />}
        {answers[1] && !isPhoneConsult && <LocationQuestion moveToNextStep={moveToNextStep} pbStation={pbInfo} />}
        {(answers[2] || isPhoneConsult) && (
          <TimeSelectQuestion isOpen={isOpen} consultTime={consultInfo} handleOpenModal={handleOpenModal} />
        )}
        {answers[3] && (
          <CheckMemoQuestion isOpen={isOpen} handleOpenModal={handleOpenModal} moveToNextStep={moveToNextStep} />
        )}
        {answers[4] && (
          <CheckInfoQuestion
            isOpen={isOpen}
            handleOpenModal={handleOpenModal}
            moveToNextStep={moveToNextStep}
            userInfo={userInfo}
          />
        )}
        {validate && (
          <button onClick={handleSubmit} className="button_fixed">
            등록하기
          </button>
        )}
      </div>
      {(step === 3 || step === 4 || step === 5) && isOpen && (
        <ModalLayout handleCloseModal={handleCloseModal}>{stepModals[step]}</ModalLayout>
      )}
    </>
  );
}

export default ReservationChat;
