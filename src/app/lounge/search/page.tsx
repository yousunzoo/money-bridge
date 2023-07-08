"use client";
import React, { useCallback, useState } from "react";
import TopNav from "@/components/common/TopNav";
import PbResult from "@/components/searchPage/PbResult";
import ContentResult from "@/components/searchPage/ContentResult";
import debounce from "lodash/debounce";
import Image from "next/image";
import search_active from "/public/assets/images/icon/search_active.svg";

function LoungeSearch() {
  const [isPB, setIsPB] = useState(true);
  const [searchContent, setSearchContent] = useState("");
  const [searchPb, setSearchPb] = useState("");
  const [pbValue, setPbValue] = useState("");
  const [contentValue, setContentValue] = useState("");

  const debouncedSearchPb = useCallback(
    debounce(search => {
      setPbValue(search);
    },300),
    [],
  );

  const debouncedSearchContent = useCallback(
    debounce(search => {
      setContentValue(search);
    },300),
    [],
  );

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isPB) {
      setSearchPb(e.target.value);
      debouncedSearchPb(e.target.value);
    } else {
      setSearchContent(e.target.value);
      debouncedSearchContent(e.target.value);
    }
  };

  const initPB = () => {
    setIsPB(true);
    setSearchPb("");
  };

  const initContent = () => {
    setIsPB(false);
    setSearchContent("");
  };

  return (
    <>
      <TopNav title="검색하기" hasBack={true} />
      <div className="relative">
        <input
          className="search_input mt-6 h-[56px] w-full"
          type="text"
          placeholder={isPB ? "궁금한 PB를 검색해보세요" : "궁금한 콘텐츠를 검색해보세요"}
          value={isPB ? searchPb : searchContent}
          onChange={onSearchChange}
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
      <div className="mt-[24px]">{isPB ? <PbResult value={pbValue} /> : <ContentResult value={contentValue} />}</div>
    </>
  );
}

export default LoungeSearch;
