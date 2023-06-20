import { useGetCompanyList } from "@/hooks/useGetCompanyList";
import React, { Dispatch, MouseEvent, SetStateAction, useState } from "react";

function CompanyList({
  setCompany,
  handleCloseModal,
}: {
  setCompany: Dispatch<SetStateAction<string | null>>;
  handleCloseModal: () => void;
}) {
  const [selectedItem, setSelectedItem] = useState<string | null>("");
  const getCompanyList = useGetCompanyList();
  console.log(getCompanyList.data?.data);

  const handleSelect = (e: MouseEvent<HTMLUListElement>) => {
    const liEl = e.target as HTMLLIElement;
    setSelectedItem(liEl.textContent);
    liEl.classList.add("bg-background-secondary");
  };

  const handleSubmit = () => {
    setCompany(selectedItem);
    handleCloseModal();
  };

  return (
    <div className="h-[472px] text-xl font-bold">
      <p className="mb-[116px]  leading-7">지점 찾기</p>
      <ul className="flex h-[168px] flex-col overflow-y-scroll text-center" onClick={handleSelect}>
        {getCompanyList.data?.data.list.map(company => (
          <li
            key={company.id}
            className={`cursor-pointer py-3.5 ${selectedItem === company.name && "bg-background-secondary"}`}
          >
            {company.name}
          </li>
        ))}
      </ul>
      <button className="my-10 h-14 w-full rounded-[8px] bg-primary-normal text-white" onClick={handleSubmit}>
        확인
      </button>
    </div>
  );
}

export default CompanyList;
