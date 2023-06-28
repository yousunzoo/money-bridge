import { useGetCompanyList } from "@/hooks/useGetCompanyList";
import { ICompanyInput } from "@/types/join";
import React, { MouseEvent, useState } from "react";

function ModalCompanyList({
  handleChangeCompany,
  handleCloseModal,
}: {
  handleChangeCompany: (item: ICompanyInput) => void;
  handleCloseModal: () => void;
}) {
  const [selectedItem, setSelectedItem] = useState<ICompanyInput>({
    name: "",
    id: 0,
  });
  const getCompanyList = useGetCompanyList();

  const handleSelect = (e: MouseEvent<HTMLUListElement>) => {
    const liEl = e.target as HTMLLIElement;
    setSelectedItem({ name: liEl.innerText, id: Number(liEl.id) });
    liEl.classList.add("bg-background-secondary");
  };

  const handleSubmit = () => {
    handleChangeCompany(selectedItem);
    handleCloseModal();
  };

  return (
    <div className="h-[472px] text-xl font-bold">
      <p className="mb-[116px]  leading-7">지점 찾기</p>
      <ul
        className="scroll_hidden -mx-4 flex h-[200px] flex-col overflow-y-scroll pr-px text-center"
        onClick={handleSelect}
      >
        {getCompanyList.data &&
          getCompanyList.data?.data.list.map(company => (
            <li
              key={company.id}
              id={`${company.id}`}
              className={`cursor-pointer py-3.5 ${selectedItem.name === company.name && "bg-background-secondary"}`}
            >
              {company.name}
            </li>
          ))}
      </ul>
      <button
        type="button"
        className="my-10 h-14 w-full rounded-[8px] bg-primary-normal text-white"
        onClick={handleSubmit}
      >
        확인
      </button>
    </div>
  );
}

export default ModalCompanyList;
