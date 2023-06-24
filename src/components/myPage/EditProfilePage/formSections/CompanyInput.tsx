import ModalCompanyList from "@/components/joinPage/pb/ModalCompanyList";
import ModalCompanyLocation from "@/components/joinPage/pb/ModalCompanyLocation";
import ModalLayout from "@/components/reservationPage/ModalLayout";
import { ICompanyInputProps } from "@/types/editProfile";
import { useState } from "react";

function CompanyInput({ getValues, handleChangeCompany, companyId, setLocation }: ICompanyInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<"location" | "company" | null>(null);
  const handleOpenCompanyModal = () => {
    setIsOpen(true);
    setModalType("company");
  };

  const handleOpenLocationModal = () => {
    setIsOpen(true);
    setModalType("location");
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <section className="mb-8">
        <p className="mb-4 text-xl font-bold">증권사를 선택해주세요.</p>
        <label htmlFor="company" className="edit_input">
          <button className="w-full text-left" onClick={handleOpenCompanyModal}>
            {getValues("company")}
          </button>
          <input className="hidden" name="company" />
        </label>
      </section>
      <section className="mb-10">
        <p className="mb-4 text-xl font-bold">지점을 입력해주세요.</p>
        <div className="flex justify-between">
          <label htmlFor="branchName" className={`edit_input flex-1 ${!getValues("branchName") && "text-placeholder"}`}>
            {getValues("branchName") ? getValues("branchName") : "지점명"}
            <input className="hidden" name="branchName" />
          </label>
          <button
            type="button"
            onClick={handleOpenLocationModal}
            className="ml-3 w-[110px] rounded-sm border-1 border-primary-normal bg-white py-4 font-bold text-primary-normal"
          >
            지점 찾기
          </button>
        </div>
      </section>{" "}
      {isOpen && (
        <ModalLayout handleCloseModal={() => setIsOpen(false)}>
          {modalType === "company" ? (
            <ModalCompanyList handleChangeCompany={handleChangeCompany} handleCloseModal={handleCloseModal} />
          ) : (
            <ModalCompanyLocation companyId={companyId} setLocation={setLocation} handleCloseModal={handleCloseModal} />
          )}
        </ModalLayout>
      )}
    </>
  );
}

export default CompanyInput;
