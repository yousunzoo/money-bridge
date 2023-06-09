import { ICandidateTimes, ISelectTimeModalProps } from "@/types/reservation";
import React, { useState } from "react";
import SelectCalendar from "./SelectCalendar";
import dayjs, { Dayjs } from "dayjs";
import TimeSelect from "./TimeSelect";
import ConsultTime from "./ConsultTime";
import ModalBackground from "../common/Modal/ModalBackground";

const BUTTON_STYLE = "w-1/2 py-2 rounded-lg";
function SelectTimeModal({ handleCloseModal, consultTime }: ISelectTimeModalProps) {
  const [step, setStep] = useState(1);
  const [select, setSelect] = useState<ICandidateTimes>({ candidateTime1: null, candidateTime2: null });

  const selectOptions = (() => {
    const { consultStart, consultEnd } = consultTime;
    const startHour = dayjs(consultStart, "hh").get("hour");
    const endHour = dayjs(consultEnd, "hh").get("hour");
    const am = [];
    const pm = [];
    for (let i = startHour; i <= endHour; i++) {
      if (i < 12) {
        am.push(i < 10 ? `0${i}:00` : `${i}:00`);
      } else {
        pm.push(`${i}:00`);
      }
    }
    return { am, pm };
  })();
  const handleCalendarSelect = (e: Dayjs) => {
    const date = e.format();
    const candidate = step === 1 ? "candidateTime1" : "candidateTime2";
    setSelect({ ...select, [candidate]: date });
  };
  const handleCancelButton = () => {
    if (step === 1) {
      handleCloseModal();
      return;
    }
    setStep(step - 1);
  };
  const handleNextButton = () => {
    if (step === 4) {
      handleCloseModal();
      return;
    }
    setStep(step + 1);
  };
  const handleTimeSelect = (time: string) => {
    const hour = Number(time.split(":")[0]);
    const selectedCand = step === 2 ? select.candidateTime1 : select.candidateTime2;
    const candidate = dayjs(selectedCand, "YYYY-MM-DD").set("hour", hour).format("YYYY-MM-DDTHH:mm:ss");
    if (step === 2) {
      setSelect({ ...select, candidateTime1: candidate });
    }
    if (step === 4) {
      setSelect({ ...select, candidateTime2: candidate });
    }
  };
  return (
    <div className="fixed left-0 top-0 h-full w-full">
      <ModalBackground />
      <ConsultTime consultTime={consultTime} />
      <section className="fixed bottom-0 left-1/2 flex h-[560px] w-[425px] -translate-x-1/2 flex-col justify-between rounded-t-3xl bg-white p-6">
        <h2 className="mb-6 text-lg font-semibold">
          희망 {step === 1 || step === 2 ? 1 : 2}순위 {step === 1 || step === 3 ? "날짜를" : "시간을"} 선택해주세요.
        </h2>
        <section className="mb-6 grow">
          {(step === 1 || step === 3) && <SelectCalendar handleSelect={handleCalendarSelect} />}
          {step === 2 && select.candidateTime1 && (
            <TimeSelect
              handleTimeSelect={handleTimeSelect}
              selectOptions={selectOptions}
              selectedDate={select.candidateTime1}
            />
          )}
          {step === 4 && select.candidateTime2 && (
            <TimeSelect
              handleTimeSelect={handleTimeSelect}
              selectOptions={selectOptions}
              selectedDate={select.candidateTime2}
            />
          )}
        </section>
        <div className="flex w-full justify-between gap-4">
          <button className={`${BUTTON_STYLE} bg-gray-300`} onClick={handleCancelButton}>
            {step === 1 ? "취소" : step === 3 ? "1순위 다시 선택하기" : "날짜 다시 선택하기"}
          </button>
          <button className={`${BUTTON_STYLE} bg-black text-white`} onClick={handleNextButton}>
            선택
          </button>
        </div>
      </section>
    </div>
  );
}

export default SelectTimeModal;
