import { ICandidateTimes, ISelectTimeModalProps } from "@/types/reservation";
import { useState } from "react";
import SelectCalendar from "./SelectCalendar";
import dayjs, { Dayjs } from "dayjs";
import TimeSelect from "./TimeSelect";
import { useReservationStore } from "@/store/reservationStore";
import { timeSelectOptions } from "@/utils/timeSelectOptions";

function SelectTimeModal({ nowStep, handleCloseModal, moveToNextStep, consultTime }: ISelectTimeModalProps) {
  const [step, setStep] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true);
  const [select, setSelect] = useState<ICandidateTimes>({ candidateTime1: null, candidateTime2: null });
  const { setAnswers } = useReservationStore();

  const selectOptions = timeSelectOptions({ ...consultTime });

  const handleCalendarSelect = (e: Dayjs) => {
    const date = e.format();
    const candidate = step === 1 ? "candidateTime1" : "candidateTime2";
    setSelect({ ...select, [candidate]: date });
    setIsDisabled(false);
  };

  const handleNextButton = () => {
    if (step === 4) {
      setAnswers(3, select);
      moveToNextStep(nowStep);
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
  const timeSelectProps = {
    setIsDisabled: setIsDisabled,
    handleTimeSelect: handleTimeSelect,
    selectOptions: selectOptions,
  };
  return (
    <div className="flex h-[520px] flex-col">
      <h2 className="mb-6 text-xl font-bold">
        희망 {step === 1 || step === 2 ? 1 : 2}순위 {step === 1 || step === 3 ? "날짜를" : "시간을"} 선택해주세요.
      </h2>
      <section className="mb-6 grow">
        {(step === 1 || step === 3) && (
          <SelectCalendar setIsDisabled={setIsDisabled} handleSelect={handleCalendarSelect} />
        )}
        {step === 2 && select.candidateTime1 && (
          <TimeSelect {...timeSelectProps} selectedDate={select.candidateTime1} />
        )}
        {step === 4 && select.candidateTime2 && (
          <TimeSelect {...timeSelectProps} selectedDate={select.candidateTime2} />
        )}
      </section>
      <button className={`button ${isDisabled && "inactive"}`} onClick={handleNextButton} disabled={isDisabled}>
        선택
      </button>
    </div>
  );
}

export default SelectTimeModal;
