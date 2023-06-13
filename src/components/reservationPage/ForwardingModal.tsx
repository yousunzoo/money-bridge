import React, { ChangeEvent, useState } from "react";
import { useReservationStore } from "@/store/reservationStore";
import { IForwardingModalProps } from "@/types/reservation";

const BUTTON_STYLE = "w-full py-2 rounded-lg";
function ForwardingModal({ nowStep, moveToNextStep, handleCloseModal }: IForwardingModalProps) {
  const { setAnswers } = useReservationStore();
  const [forwarding, setForwarding] = useState("");
  const [isValidate, setIsValidate] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setForwarding(text);
    if (text.length > 100 || text.length === 0) {
      setIsValidate(false);
      setIsError(true);
    } else {
      setIsError(false);
      setIsValidate(true);
    }
  };

  const handleConfirmButton = () => {
    setAnswers(4, forwarding);
    moveToNextStep(nowStep);
    handleCloseModal();
  };
  return (
    <>
      <h2 className="mb-10 text-xl font-semibold">추가 전달 사항</h2>
      <textarea
        onChange={handleChange}
        value={forwarding}
        className="border-2 mb-2 h-40 w-full resize-none px-4 py-2"
        placeholder="참고사항이나 날짜, 시간 등 편안하게 입력해주세요."
      />
      <div className="mb-10 flex flex-wrap justify-between text-sm">
        <p className="text-red-600">{isError ? "*100자 이내로 작성해주세요." : ""}</p>
        <p>
          <span className={`${isError && "text-red-600"}`}>{forwarding.length}</span>/100
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p>상담 내용에는 포함하지 말아주세요.</p>
        <p className="text-sm">*개인 정보(주민번호, 주소 등)및 외부 링크</p>
        <p className="text-sm">*투자 관련 이외의 상담 글</p>
        <p className="text-sm">*의미 없는 문자의 나열</p>
      </div>
      <button className={`${BUTTON_STYLE} bg-gray-300 mt-auto`} onClick={handleConfirmButton} disabled={!isValidate}>
        완료
      </button>
    </>
  );
}

export default ForwardingModal;
