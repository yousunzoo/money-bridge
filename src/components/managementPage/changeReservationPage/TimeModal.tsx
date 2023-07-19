import Image from "next/image";
import React from "react";
import close from "/public/assets/images/close.svg";
import TimeSelect from "@/components/reservationPage/TimeSelect";
import dayjs from "dayjs";
import { TimeModalProps } from "@/types/management";

function TimeModal({
  timeOpenHandler,
  consultTime,
  selectedDate,
  handleTimeSelect,
  timeSelectClick,
  isDisabled,
  setIsDisabled,
}: TimeModalProps) {
  const selectOptions = (() => {
    const { consultStart, consultEnd } = consultTime;
    const startHour = dayjs(consultStart, "HH").get("hour");
    const endHour = dayjs(consultEnd, "HH").get("hour");

    const am = [];
    const pm = [];

    if (startHour <= endHour) {
      for (let i = startHour; i <= endHour; i++) {
        if (i < 12) {
          am.push(i < 10 ? `0${i}:00` : `${i}:00`);
        } else {
          pm.push(`${i}:00`);
        }
      }
    } else {
      for (let i = startHour; i <= 23; i++) {
        pm.push(`${i}:00`);
      }
      for (let i = 0; i <= endHour; i++) {
        am.push(i < 10 ? `0${i}:00` : `${i}:00`);
      }
    }

    return { am, pm };
  })();

  return (
    <section className="fixed top-0 left-0 z-30 w-full h-full">
      <div className="modal_background" />
      <div className="fixed bottom-0 left-1/2 z-10 flex min-w-[380px] max-w-[320px] -translate-x-1/2 flex-col  rounded-t-md bg-white px-6 py-6 shadow-lg">
        <div className="flex items-center justify-between w-full mb-4">
          <h3 className="text-lg font-bold ">
            날짜를 선택해주세요. <span className="text-xs">(날짜 선택 후 시간 선택)</span>
          </h3>
          <button onClick={timeOpenHandler}>
            <Image src={close} alt="close" width={24} height={24} />
          </button>
        </div>
        <TimeSelect
          setIsDisabled={setIsDisabled}
          selectOptions={selectOptions}
          selectedDate={selectedDate}
          handleTimeSelect={handleTimeSelect}
        />
        <button
          onClick={timeSelectClick}
          className={`mt-3 w-full rounded-md bg-primary-normal py-3 text-base font-bold text-white`}
          disabled={isDisabled}
        >
          선택하기
        </button>
      </div>
    </section>
  );
}

export default TimeModal;
