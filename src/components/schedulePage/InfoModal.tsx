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
    <div className="absolute right-7 top-14 z-10 flex h-[140px] w-[280px] flex-col rounded-md bg-white p-4 shadow-md ">
      <div className="flex items-end justify-between w-full h-auto">
        <div className="text-sm">
          <Image src={question} alt="question" width={20} height={20} className="mb-2" />
          <p className="text-sm font-bold ">컬러로 상담 현황을</p>
          <p className="text-sm font-bold ">한눈에 파악하세요.</p>
        </div>
        <div className="flex h-[52px] w-[52px] flex-col items-center rounded-md bg-white p-2 shadow-md">
          <div className="font-bold">9</div>
          <ul className="flex gap-1">
            {statusItems.map(item => (
              <li key={item.id} className={`h-[6px] w-[6px] rounded-full ${item.color}`}></li>
            ))}
          </ul>
        </div>
      </div>
      <ul className="flex gap-2 mt-3">
        {statusItems.map(item => (
          <li key={item.id} className={`w-[60px] rounded-sm  p-2 text-center text-[10px] text-white ${item.color}`}>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InfoModal;
