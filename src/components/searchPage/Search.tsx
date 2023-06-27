import React, { useState } from "react";
import Image from "next/image";
import search_active from "/public/assets/images/icon/search_active.svg";

function Search({
  isPB,
  searchPb,
  searchContent,
  onSearchChange,
  onSearch,
}: {
  isPB: boolean;
  searchPb: string;
  searchContent: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative">
      <input
        className="search_input mt-6 h-[56px] w-full"
        type="text"
        placeholder="궁금한 정보를 검색해보세요"
        value={isPB ? searchPb : searchContent}
        onChange={onSearchChange}
        onKeyDown={onSearch}
      />
      <Image src={search_active} alt="검색 활성화" className="absolute left-4 top-10 h-[25px] w-[25px]" />
    </div>
  );
}

export default Search;
