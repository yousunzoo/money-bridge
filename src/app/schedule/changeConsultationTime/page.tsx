"use client";
import TopNav from "@/components/common/TopNav";
import React, { useState } from "react";
import arrowbutton from "/public/assets/images/selectArrow.svg";

import Image from "next/image";
function ChangeConsultationTimePage() {
  const data = {
    consultStart: "09:00:00",
    consultEnd: "18:00:00",
    consultNotice: "월요일 불가능합니다",
  };

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectTime, setSelectTime] = useState({
    consultStart: data.consultStart,
    consultEnd: data.consultEnd,
  });

  const timeOptions = () => {
    const options = [];
    for (let hour = 1; hour < 25; hour++) {
      const time = `${hour.toString().padStart(2, "0")}:00`;
      options.push(time);
    }
    return options;
  };

  const startTimeSelect = (e: any) => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <div>
      <TopNav title={"상담 가능 시간 변경하기"} hasBack={true} />
      <section>
        <h3 className="mt-10 text-xl font-bold">상담 가능 시간을 설정해주세요.</h3>
        <div className="flex items-center justify-center rounded-md py-6 shadow-md">
          <div className="flex flex-col">
            <span className="text-center font-bold">업무 시작 시간</span>
            <button
              onClick={startTimeSelect}
              className="relative mt-3 flex h-[36px] w-[120px] items-center justify-center gap-4 rounded-md border-1 border-background-secondary px-2 shadow-md"
            >
              <span>09:00</span>
              <Image src={arrowbutton} alt={"arrow"} width={18} height={28} />
              {isOpenModal && (
                <ul className="absolute top-10 h-[200px] w-[120px] overflow-auto rounded-md bg-white p-2 shadow-md">
                  {timeOptions().map(time => (
                    <li key={time} className="rounded-md p-1 pl-4 text-left hover:bg-background-normal">
                      {time}
                    </li>
                  ))}
                </ul>
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChangeConsultationTimePage;
