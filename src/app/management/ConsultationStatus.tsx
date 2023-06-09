import React from "react";

function ConsultationStatus() {
  return (
    <section className="px-2">
      <h2 className="mt-2 pl-4 text-lg font-bold">상담현황</h2>
      <div className="flex ">
        <div className="m-4 mr-2 w-[200px] bg-gray-300 p-4">
          <div className="flex justify-between py-2">
            <span>신규예약</span>
            <p>2건</p>
          </div>
          <div className="flex justify-between py-2">
            <span>신규예약</span>
            <p>2건</p>
          </div>
          <div className="flex justify-between py-2">
            <span>신규예약</span>
            <p>2건</p>
          </div>
        </div>
        <div className="m-4 ml-2 flex w-[200px] flex-col justify-between ">
          <button className="bg-gray-300 py-5">일정 관리</button>
          <button className="bg-gray-300 py-5">나의 후기</button>
        </div>
      </div>
    </section>
  );
}

export default ConsultationStatus;
