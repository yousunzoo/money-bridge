"use client";
import React, { useState } from "react";
import TopNav from "@/components/common/TopNav";
import PbResult from "@/components/searchPage/PbResult";
import ContentResult from "@/components/searchPage/ContentResult";
import Search from "@/components/searchPage/Search";

function LoungeSearch() {
  const [isPB, setIsPB] = useState<boolean>(true);
  const [contentValue, setContentValue] = useState<string>("");
  const [searchContent, setSearchContent] = useState<string>("");
  const [pbValue, setPbValue] = useState<string>("");
  const [searchPb, setSearchPb] = useState<string>("");

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
        if (searchPb.trim() !== "") {
          setPbValue(searchPb);
          setSearchPb("");
        }
      } else {
        if (searchContent.trim() !== "") {
          setContentValue(searchContent);
          setSearchContent("");
        }
      }
    }
  };

  const initPB = () => {
    setIsPB(true);
    setPbValue("");
    setSearchPb("");
  };

  const initContent = () => {
    setIsPB(false);
    setContentValue("");
    setSearchContent("");
  };

  return (
    <>
      <TopNav title="검색하기" hasBack={true} />
      <Search isPB={isPB} searchPb={searchPb} searchContent={searchContent} onSearchChange={onSearchChange} onSearch={onSearch} />
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
          <PbResult pbValue={pbValue} />
        ) : (
          <ContentResult contentValue={contentValue} />
        )}
      </div>
    </>
  );
}

export default LoungeSearch;
