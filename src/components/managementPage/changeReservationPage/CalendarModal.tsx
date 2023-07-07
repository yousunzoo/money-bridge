import SelectCalendar from "@/components/reservationPage/SelectCalendar";
import React from "react";
import close from "/public/assets/images/close.svg";
import Image from "next/image";
import { CalendarModalProps } from "@/types/management";

function CalendarModal({
  calendarOpenHandler,
  isDisabled,
  setIsDisabled,
  handleCalendarSelect,
  dateSelectClick,
}: CalendarModalProps) {
  return (
    <section className="fixed left-0 top-0 z-20 h-full w-full">
      <div className="modal_background" />
      <div className=" fixed bottom-[70px] left-1/2 z-10 flex min-w-[380px]  max-w-[320px] -translate-x-1/2 flex-col items-center rounded-t-md bg-white px-6 py-6 shadow-lg">
        <div className="mb-4 flex w-full items-center justify-between">
          <h3 className="text-lg font-bold ">
            날짜를 선택해주세요. <span className="text-xs">(날짜 선택 후 시간 선택)</span>
          </h3>
          <button onClick={calendarOpenHandler}>
            <Image src={close} alt="close" width={24} height={24} />
          </button>
        </div>
        <SelectCalendar setIsDisabled={setIsDisabled} handleSelect={handleCalendarSelect} />
        <button
          onClick={dateSelectClick}
          className={`w-full rounded-md bg-primary-normal py-3 text-white  ${
            isDisabled && "inactive"
          } mt-3  text-base font-bold`}
          disabled={isDisabled}
        >
          선택하기
        </button>
      </div>
    </section>
  );
}

export default CalendarModal;
