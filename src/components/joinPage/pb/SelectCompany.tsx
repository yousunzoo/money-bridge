import Image from "next/image";
import { useState } from "react";
import dropDown from "/public/assets/images/dropDown.svg";
import ModalLayout from "@/components/reservationPage/ModalLayout";
import ModalCompanyList from "./ModalCompanyList";
import ModalCompanyLocation from "./ModalCompanyLocation";
import { ICompanyInput } from "@/types/join";
import { useJoinStore } from "@/store/joinStore";
import { useRouter } from "next/navigation";
import { useGetCompanyList } from "@/hooks/useGetCompanyList";

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
  const { setInformations } = useJoinStore();
  const companyList = useGetCompanyList();
  const router = useRouter();

  const handleChangeCompany = (item: ICompanyInput) => {
    if (item.name !== company.name) {
      setCompany(item);
      setLocation({ name: "", id: 0 });
    }
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

  return (
    <>
      <p className="mb-6 mt-14 text-xl font-bold leading-7">
        소속되어있는 증권사를
        <br /> 선택해주세요
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
      <p className="mb-6 mt-[58px] text-xl font-bold leading-7">지점을 입력해주세요</p>
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
        className={`mt-9 h-16 w-full rounded-[8px] text-xl font-bold leading-7  ${
          company.name === "" || location.name === ""
            ? "bg-background-secondary text-gray-heavy"
            : "bg-primary-normal text-white"
        }`}
        disabled={company.name === "" || location.name === ""}
        onClick={handleSubmit}
      >
        다음
      </button>
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
    </>
  );
}

export default SelectCompany;
