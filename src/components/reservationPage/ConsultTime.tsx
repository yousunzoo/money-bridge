import React from "react";

function ConsultTime({ consultTime }) {
  const { consultStart, consultEnd, notice } = consultTime;
  return (
    <section className="absolute left-1/2 m-auto mt-10 h-60 w-[400px] -translate-x-1/2 rounded-2xl bg-black p-4">
      <h2 className="w-fit rounded-xl bg-white px-4 py-2">상담 가능 시간을 확인해주세요</h2>
      <p className="mt-6 text-white">
        업무 시간 : {consultStart} ~ {consultEnd}
      </p>
      <p className="mt-6 text-white">안내 사항 : {notice}</p>
    </section>
  );
}

export default ConsultTime;
