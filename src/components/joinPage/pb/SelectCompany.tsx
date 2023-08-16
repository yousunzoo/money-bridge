"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import dropDown from "/public/assets/images/dropDown.svg";
import ModalLayout from "@/components/reservationPage/ModalLayout";
import ModalCompanyList from "./ModalCompanyList";
import ModalCompanyLocation from "./ModalCompanyLocation";
import { ICompanyInput } from "@/types/join";
import { useJoinStore } from "@/store/joinStore";
import { useRouter } from "next/navigation";
import { useGetCompanyList } from "@/hooks/useGetCompanyList";
import question from "/public/assets/images/question_mark.svg";
import KakaoMapScriptLoader from "./kakaoMap/KakaoMapScriptLoader";
import { PlaceType } from "@/types/mapTypes";
import MapMarkerController from "./kakaoMap/MapMarkerController";
import { useBranchRestrationStore } from "@/store/branchRestrationStore";
import BranchCreation from "./BranchCreation";
import SearchLocation from "./SearchLocation";

function SelectCompany() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocation, setIsLocation] = useState(false);

  const [company, setCompany] = useState<ICompanyInput>({
    name: "",
    id: 0,
  });
  const [location, setLocation] = useState<ICompanyInput>({
    name: "",
    id: 0,
  });
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const [selectBank, setSelectBank] = useState("");

  const { setInformations } = useJoinStore();

  const {
    isButtonOpen,
    isRegOpen,
    isRegSelect,
    selectCompany,
    setIsButtonOpen,
    setIsRegSelect,
    setIsRegOpen,
    setSelectCompany,
  } = useBranchRestrationStore();

  const companyList = useGetCompanyList();
  const router = useRouter();
  useEffect(() => {
    // 도로명 주소 변환 함수
  }, [selectCompany]);

  const handleChangeCompany = (item: ICompanyInput) => {
    if (item.name !== company.name) {
      setSelectBank(item.name);
      setCompany(item);
      setLocation({ name: "", id: 0 });
    }

    setSelectCompany({
      ...selectCompany,
      companyId: item.id,
      name: item.name,
    });
  };

  const handleOpenCompany = () => {
    setIsLocation(false);
    setIsOpen(true);
  };

  const handleOpenLocation = () => {
    setIsLocation(true);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    setInformations("branchId", location.id);
    router.push("/join/pb/career");
  };

  const handleRegModal = () => {
    setIsRegOpen(true);
  };
  const handleRegCloseModal = () => {
    setIsRegOpen(false);
  };

  const handleSelectCloseModal = () => {
    setIsRegSelect(false);
  };

  const modalContents = {
    content: "예약 확정을 하시겠습니까?",
    confirmText: "확인",
    confirmFn: () => setIsButtonOpen(false),
  };

  return (
    <>
      <p className="mb-6 mt-14 text-xl font-bold leading-7">
        소속되어있는 증권사를
        <br /> 선택해주세요.
      </p>
      <div
        className={`relative flex h-14 w-full cursor-pointer items-center rounded-sm border-1 ${
          company.name ? "border-primary-normal" : "border-button-inactive"
        } pl-3`}
        onClick={handleOpenCompany}
      >
        <span className={`${company.name ? "text-black" : "text-placeholder"}`}>
          {company.name === "" ? "증권사 선택" : company.name}
        </span>
        <Image src={dropDown} alt="dropDown" width={24} height={24} className="absolute right-3" />
      </div>
      <div className="mb-6 mt-[58px] flex items-center justify-between ">
        <p className="text-xl font-bold ">지점을 등록해주세요.</p>
        <button className="text-md flex cursor-pointer items-center text-gray-heavy" onClick={handleRegModal}>
          <span className="cursor-pointer font-bold">없는 지점 직접 등록하기</span>
          <Image src={question} alt="question" width={20} height={20} className="ml-2" />
        </button>
      </div>
      <div className="flex gap-2">
        <div
          className={`flex h-14 w-full items-center rounded-sm border-1  pl-3 ${
            location.name ? "border-primary-normal" : "border-button-inactive"
          }`}
        >
          <span>{location.name}</span>
        </div>
        <button
          className={`flex h-14 w-[110px] items-center justify-center rounded-sm border-1 ${
            company.name ? "border-primary-normal" : "border-button-inactive"
          }`}
          onClick={handleOpenLocation}
          disabled={company.name === ""}
        >
          <span className={`font-bold ${company.name ? "text-primary-normal" : "text-placeholder"}`}>지점 찾기</span>
        </button>
      </div>
      <button
        className={`mb-5 mt-9 h-16 w-full rounded-[8px] text-xl font-bold leading-7  ${
          company.name === "" || location.name === ""
            ? "bg-background-secondary text-gray-heavy"
            : "bg-primary-normal text-white"
        }`}
        disabled={company.name === "" || location.name === ""}
        onClick={handleSubmit}
      >
        다음
      </button>
      <p className="text-sm leading-6">*찾으시는 지점이 없으신 경우 help@sysmetic.co.kr 로 문의 바랍니다</p>
      {isOpen && (
        <ModalLayout handleCloseModal={handleCloseModal}>
          {isLocation ? (
            <ModalCompanyLocation setLocation={setLocation} company={company} handleCloseModal={handleCloseModal} />
          ) : (
            <ModalCompanyList
              handleChangeCompany={handleChangeCompany}
              handleCloseModal={handleCloseModal}
              companyList={companyList.data}
            />
          )}
        </ModalLayout>
      )}
      {isRegOpen && (
        <ModalLayout handleCloseModal={handleRegCloseModal}>
          <KakaoMapScriptLoader>
            <MapMarkerController places={places} />
            <SearchLocation
              searchDefalutValue={selectBank}
              onUpdatePlaces={places => {
                setPlaces(places);
              }}
            />
          </KakaoMapScriptLoader>
        </ModalLayout>
      )}
      {isRegSelect && (
        <ModalLayout handleCloseModal={handleSelectCloseModal}>
          <BranchCreation />
        </ModalLayout>
      )}
      {isButtonOpen && (
        <div className="fixed left-0 top-0 z-30 h-full w-full">
          <div className="modal_background" onClick={() => setIsOpen(false)} />
          <div className="popup flex flex-col justify-between">
            <div className="text-center">
              <h3 className={`text-lg mb-2 break-keep pt-20 text-center`}>지점등록이 완료되었습니다.</h3>
            </div>
            <div className="flex w-full gap-4">
              <button onClick={() => setIsButtonOpen(false)} className="popup-button w-full font-bold">
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SelectCompany;
