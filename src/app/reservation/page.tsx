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
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getReservationData } from "../apis/services/user";

function ReservationPage() {
  const params = useSearchParams().get("pbId");
  console.log(params);
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["reservation", params],
    queryFn: () => getReservationData(params as string),
    enabled: !!params,
  });

  const { answers, resetAnswers } = useReservationStore();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [isChecked, setIsChecked] = useState<{ [key: number]: boolean }>({});
  const [isPhoneConsult, setIsPhoneConsult] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

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
    setIsChecked({ ...isChecked, [nowStep]: true });
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
    if (isChecked[5]) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isChecked]);

  if (!params) {
    router.push("/lounge");
    return;
  }
  if (!data) return;

  const { pbInfo, pbStation, consultInfo, userInfo } = data;
  return (
    <>
      <div className="w-full py-6 pb-40" ref={sectionRef}>
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
        <BubbleSection step={0} moveToNextStep={moveToNextStep} />
        {isChecked[0] && <BubbleSection step={1} moveToNextStep={moveToNextStep} skipNextStep={skipNextStep} />}
        {isChecked[1] && !isPhoneConsult && (
          <BubbleSection step={2} moveToNextStep={moveToNextStep} pbStation={pbInfo} />
        )}
        {(isChecked[2] || isPhoneConsult) && (
          <BubbleSection
            step={3}
            isOpen={isOpen}
            handleOpenModal={handleOpenModal}
            moveToNextStep={moveToNextStep}
            consultTime={consultInfo}
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
          <button onClick={handleSubmit} className="button_fixed">
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
              consultTime={consultInfo}
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
