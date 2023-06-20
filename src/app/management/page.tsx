"use client";
import TopNav from "@/components/common/TopNav";
import React, { useEffect, useState } from "react";
import ConsultationStatus from "../../components/managementPage/ConsultationStatus";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import managementRecent from "../../mocks/kjun/managementRecent.json";
import ProcessList from "@/components/common/ProcessList";
import pocessData from "../../mocks/kjun/managementRevervationStatue.json";

interface SelectedData {
  reservationId: number;
  isNewReservation: boolean;
  profileImage: string;
  name: string;
  createdAt: string;
  type: string;
}

const PROCESS_NAME: Record<string, string> = {
  APPLY: "신규예약",
  CONFIRM: "예약확정",
  COMPLETE: "상담완료",
  WITHDRAW: "예약취소",
};
function ManagementPage() {
  const [isProcess, setIsProcess] = useState("APPLY");
  const [selectData, setSelectData] = useState<SelectedData[] | null>(null);
  const [selectPath, setSelectPath] = useState("newReservation");
  const data = managementRecent.data;
  const apply = pocessData.data.APPLY;
  const complate = pocessData.data.COMPLETE;
  const cpmfirm = pocessData.data.CONFIRM;
  const withdraw = pocessData.data.WITHDRAW;
  const onClickhandler = () => {
    console.log("click");
  };

  useEffect(() => {
    switch (isProcess) {
      case "APPLY":
        setSelectData(apply);
        setSelectPath("newReservation");
        break;
      case "COMPLETE":
        setSelectData(complate);
        setSelectPath("completedConsultation");
        break;
      case "CONFIRM":
        setSelectData(cpmfirm);
        setSelectPath("confirmedReservation");

        break;
      case "WITHDRAW":
        setSelectData(withdraw);
        setSelectPath("canceledConsultation");
        break;
    }
  }, [isProcess]);

  return (
    <div className="flex flex-col items-center">
      <TopNav title={"고객관리"} />
      <ConsultationStatus {...data} />
      <ProcessList setIsProcess={setIsProcess} role={"pb"} />

      <div className="my-8 h-2 w-full bg-background-secondary"></div>

      <div className="w-full justify-start">
        <div>
          <h3 className="text-lg pl-1 font-bold">{`${PROCESS_NAME[isProcess]} ${selectData?.length}건`}</h3>
          <p className="my-1 mb-6 pl-1 text-sm">예약 희망 일정을 확인 한 후 유선으로 상담 일정을 조율해주세요.</p>
          <ul className="flex flex-col gap-4">
            {selectData &&
              selectData.map(({ reservationId, name, createdAt, type }) => (
                <UserReservationItem
                  buttonName="고객 정보"
                  key={reservationId}
                  href={`/management/${selectPath}/${reservationId}`}
                  isRole={"USER"}
                >
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

export default ManagementPage;
