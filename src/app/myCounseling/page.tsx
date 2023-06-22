"use client";

import TopNav from "@/components/common/TopNav";
import React, { useEffect, useState } from "react";
import ProcessList from "@/components/common/ProcessList";
import pocessData from "../../mocks/kjun/managementRevervationStatue.json";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import managementRecent from "../../mocks/kjun/managementRecent.json";
import UserConsultationStatus from "./UserConsultationStatus";
const PROCESS_NAME: Record<string, string> = {
  APPLY: "신규예약",
  CONFIRM: "예약확정",
  COMPLETE: "상담완료",
  WITHDRAW: "예약취소",
};
interface SelectedData {
  reservationId: number;
  isNewReservation: boolean;
  profileImage: string;
  name: string;
  createdAt: string;
  type: string;
}

function MyCounselingPage() {
  const [isProcess, setIsProcess] = useState("APPLY");
  const [selectData, setSelectData] = useState<SelectedData[] | null>(null);
  const data = managementRecent.data;
  const apply = pocessData.data.APPLY;
  const complate = pocessData.data.COMPLETE;
  const cpmfirm = pocessData.data.CONFIRM;
  const withdraw = pocessData.data.WITHDRAW;

  useEffect(() => {
    switch (isProcess) {
      case "APPLY":
        setSelectData(apply);
        break;
      case "COMPLETE":
        setSelectData(complate);
        break;
      case "CONFIRM":
        setSelectData(cpmfirm);
        break;
      case "WITHDRAW":
        setSelectData(withdraw);
        break;
    }
  }, [isProcess]);

  return (
    <div>
      <TopNav title={"나의 상담"} />
      <UserConsultationStatus {...data} />
      <ProcessList setIsProcess={setIsProcess} role={"user"} />

      <div className="my-8 h-2 w-full bg-background-secondary"></div>

      <div className="w-full justify-start">
        <div>
          <h3 className="text-lg pl-1 font-bold">{`${PROCESS_NAME[isProcess]} ${selectData?.length}건`}</h3>
          <p className="my-1 mb-6 pl-1 text-sm">프라이빗 뱅커가 곧 유선으로 연락을 드립니다.</p>
          <ul className="flex flex-col gap-4">
            {selectData &&
              selectData.map(({ reservationId, name, createdAt, type }) => (
                <UserReservationItem buttonName="정보 보기" key={reservationId} href={"/"} isRole={"pb"}>
                  <p className="font-bold">{name}</p>
                  <p className="text-xs ">{createdAt} </p>
                  <p className="text-xs ">{type === "VISIT" ? "방문상담" : "유선상담"}</p>
                </UserReservationItem>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MyCounselingPage;
