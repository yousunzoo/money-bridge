import Image from "next/image";
import React from "react";
import question from "/public/assets/images/question_mark.svg";

const statusItems = [
  { id: 1, color: "bg-[#EB5147]", text: "신규예약" },
  { id: 2, color: "bg-[#3A7391]", text: "예약확정" },
  { id: 3, color: "bg-[#153445]", text: "상담완료" },
];

function InfoModal() {
  return (
    <div className="absolute right-14 top-16 z-10 flex h-[140px] w-[280px] flex-col rounded-xl bg-white p-4 shadow-xl ">
      <div className="flex h-auto w-full items-end justify-between">
        <div className="text-sm">
          <Image src={question} alt="question" width={20} height={20} className="mb-2" />
          <p className="text-sm font-bold ">컬러로 상담 현황을</p>
          <p className="text-sm font-bold ">한눈에 파악하세요.</p>
        </div>
        <div className="flex h-[52px] w-[52px] flex-col items-center rounded-lg bg-white p-2 shadow-2xl">
          <div className="font-bold">9</div>
          <ul className="flex gap-1">
            {statusItems.map(item => (
              <li key={item.id} className={`h-[6px] w-[6px] rounded-full ${item.color}`}></li>
            ))}
          </ul>
        </div>
      </div>
      <ul className="mt-3 flex gap-2">
        {statusItems.map(item => (
          <li key={item.id} className={`w-[60px] rounded-full  p-2 text-center text-[10px] text-white ${item.color}`}>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InfoModal;
