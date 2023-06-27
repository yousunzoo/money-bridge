"use client";
import React, { useState } from "react";
import TopNav from "@/components/common/TopNav";
import search_active from "/public/assets/images/icon/search_active.svg";
import Image from "next/image";
import PbCardList from "@/components/common/Card/CardList/PbCardList";
import { getSearchPb, getSearchContent } from "@/app/apis/services/common";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";
function LoungeSearch() {
  const [isPB, setIsPB] = useState(true);
  const [contentValue, setContentValue] = useState("");
  const [searchContent, setSearchContent] = useState("");
  const [pbValue, setPbValue] = useState("");
  const [searchPb, setSearchPb] = useState("");

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isPB) {
      setSearchPb(e.target.value);
    } else {
      setSearchContent(e.target.value);
    }
  };

  
  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (isPB) {
        setPbValue(searchPb);
      } else {
        setContentValue(searchContent);
      }
    }
  };

  const initPB = () => {
    setIsPB(true);
  };

  const initContent = () => {
    setIsPB(false);
  };

console.log(pbValue);
  return (
    <>
      <TopNav title="검색하기" hasBack={true} />
      <div className="relative">
        <input
          className="search_input mt-6 h-[56px] w-full"
          type="text"
          placeholder="궁금한 정보를 검색해보세요"
          onChange={onSearchChange}
          onKeyDown={onSearch}
        />
        <Image src={search_active} alt="검색 활성화" className="absolute left-4 top-10 h-[25px] w-[25px]" />
      </div>
      <div className="mt-6 flex text-base font-bold text-primary-normal">
        <div
          className={`mr-2 flex h-[40px] flex-1 cursor-pointer items-center justify-center rounded-3xl border-[2px] ${
            isPB ? "bg-primary-normal text-white" : ""
          }`}
          onClick={initPB}
        >
          PB 검색
        </div>
        <div
          className={`ml-2 flex h-[40px] flex-1 cursor-pointer items-center justify-center rounded-3xl border-[2px] ${
            isPB ? "" : "bg-primary-normal text-white"
          }`}
          onClick={initContent}
        >
          콘텐츠 검색
        </div>
      </div>
      <div className="mt-[24px]">
        {isPB ? (
          <>
            {pbValue! == "" && (
              <>
                <div className="mb-[24px] h-[34px] border-b-[1px] border-b-gray-normal text-gray-normal">
                  {/* {getResult() ? <>PB 검색 결과</> : <>일치하는 정보가 없습니다</>} */}
                </div>
                <PbCardList queryKey={"getSearchPb"} api={getSearchPb} etc={pbValue} />
              </>
            )}
          </>
        ) : (
          <>
            {contentValue !== "" && (
              <>
                <div className="mb-[24px] h-[34px] border-b-[1px] border-b-gray-normal text-gray-normal">
                  {/* {getResult() ? <>콘텐츠 검색 결과</> : <>일치하는 정보가 없습니다</>} */}
                </div>
                <ContentCardList queryKey={"getSearchContent"} api={getSearchContent} etc={contentValue} />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default LoungeSearch;
