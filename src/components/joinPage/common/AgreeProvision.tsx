import React, { MouseEvent, useState } from "react";
import checkProvision from "/public/assets/images/checkProvision.svg";
import uncheckProvision from "/public/assets/images/uncheckProvision.svg";
import openProvision from "/public/assets/images/openProvision.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useJoinStore } from "@/store/joinStore";
import { useUserJoin } from "@/hooks/useUserJoin";
import { usePBJoin } from "@/hooks/usePBJoin";
import DetailProvision from "./DetailProvision";
import ProvisionContent from "./ProvisionContent";
import ButtonModal from "@/components/common/ButtonModal";
import { IModalContent } from "@/types/common";

interface IProvision {
  id: number;
  title: string;
}

export const userRequired: IProvision[] = [
  { id: 0, title: "시스메틱 이용약관 동의" },
  { id: 1, title: "개인정보 취급방침 동의" },
  { id: 2, title: "개인정보 제 3자 제공 동의" },
];

export const pbRequired: IProvision[] = [
  { id: 0, title: "시스메틱 이용약관 동의" },
  { id: 1, title: "개인정보 취급방침 동의" },
  { id: 2, title: "개인정보 제 3자 제공 동의" },
];
const optional: IProvision[] = [
  // { id: required.length, title: "위치기반 서비스 이용 동의" },
  // { id: required.length + 1, title: "포트폴리오 관련 정보 수신 동의" },
  // { id: required.length + 2, title: "마케팅 및 정보성 알림 수신 동의" },
];

function AgreeProvision() {
  const router = useRouter();
  const pathName = usePathname();
  const required = pathName.split("/")[2] === "user" ? userRequired : pbRequired;
  const { informations, setInformations } = useJoinStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [provisionId, setProvisionId] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<{ [key: number]: boolean }>(required.concat(optional).map(() => false));
  const modalContents_Default = {
    content: "일시적인 오류가 발생했습니다.",
    confirmText: "확인",
    confirmFn: () => {
      setIsOpen(false);
    },
  };
  const [modalContent, setModalContent] = useState<IModalContent>(modalContents_Default);

  const pbJoin = usePBJoin(setIsModalOpen, setModalContent);
  const userJoin = useUserJoin(setIsModalOpen, setModalContent);

  const handleOpenProvision = (e: MouseEvent<HTMLElement>) => {
    setIsOpen(true);
    const target = e.target as HTMLButtonElement;
    setProvisionId(Number(target.id));
  };

  const handleCloseProvision = () => {
    setIsOpen(false);
  };

  const handleCheckboxClick = (key: number) => {
    setIsChecked({ ...isChecked, [key]: !isChecked[key] });
  };

  const handleAllClick = () => {
    setIsChecked(required.concat(optional).map(() => true));
  };

  const isAllChecked = () => {
    return Object.values(isChecked).every(checked => checked);
  };

  const isNecessaryAllChecked = () => {
    const necessaryLength = required.length;
    for (let i = 0; i < necessaryLength; i++) {
      if (isChecked[i] === false) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    const optional_ = Object.entries(isChecked).filter((value, index) => index > required.length - 1);

    const reqData_required = required.map(item => ({
      title: item.title,
      type: "REQUIRED",
      isAgreed: true,
    }));

    const reqData_optional = optional_.map(index => ({
      title: optional[Number(index[0]) - required.length].title,
      type: "OPTIONAL",
      isAgreed: index[1],
    }));

    const data = reqData_required.concat(reqData_optional);

    setInformations("agreements", data);
    const joinType = pathName.split("/")[2];
    joinType === "user" ? userJoin(informations) : pbJoin(informations);
  };

  return (
    <>
      {isOpen ? (
        <DetailProvision handleCloseProvision={handleCloseProvision} provisionId={provisionId} />
      ) : (
        <>
          <p className="my-14 text-xl font-bold leading-7">약관을 확인해 주세요</p>
          <div className="border mb-6 rounded-sm border-1 border-button-inactive">
            <div className="border relative flex h-14 w-full min-w-[358px] items-center gap-4 pl-6 pr-4">
              <button className="flex h-6 w-6 items-center justify-center" onClick={handleAllClick}>
                <Image src={isAllChecked() ? checkProvision : uncheckProvision} alt="check" width={18} height={24} />
              </button>
              <span className="text-xl font-bold leading-7">약관 전체 동의</span>
              <button className="absolute right-6 flex h-6 w-6 items-center justify-center">
                <Image src={openProvision} alt="open" width={13} height={21} />
              </button>
            </div>
          </div>
          <div className="border mb-6 rounded-sm border-1 border-button-inactive">
            {required.map(item => (
              <div key={item.id}>
                {ProvisionContent(item.id, item.title, handleCheckboxClick, isChecked[item.id], handleOpenProvision)}
              </div>
            ))}
          </div>
          {optional.length !== 0 && (
            <div className="border mb-6 rounded-sm border-1 border-button-inactive">
              {optional.map(item => (
                <div key={item.id}>
                  {ProvisionContent(item.id, item.title, handleCheckboxClick, isChecked[item.id], handleOpenProvision)}
                </div>
              ))}
            </div>
          )}
          <button
            className={`mb-[50px] mt-8 h-14 w-full rounded-[8px]  text-xl font-bold leading-7 ${
              isNecessaryAllChecked() ? "bg-primary-normal text-white" : "bg-background-secondary text-gray-heavy"
            }`}
            onClick={handleSubmit}
            disabled={!isNecessaryAllChecked()}
          >
            회원가입 완료
          </button>
          {isModalOpen && (
            <ButtonModal modalContents={modalContent} isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
              <p>정보를 확인해 주세요.</p>
            </ButtonModal>
          )}
        </>
      )}
    </>
  );
}
export default AgreeProvision;
