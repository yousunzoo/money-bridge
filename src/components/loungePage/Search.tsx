"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // todo: 검색결과 보여주기, 검색값 로컬스토리지에 저장(최근 검색어)
    console.log("Search term:", searchTerm);
  };

  const goToSearch = () => {
    router.push("/search");
  };

  const inputClassName =
    pathname === "/search"
      ? "w-4/5 px-2 focus:outline-none"
      : "w-4/5 px-2 focus:outline-none pointer-events-none";
  
  return (
    <div className="border-gray mx-auto my-2 flex h-10 w-4/5 rounded-md border border-solid p-1" onClick={goToSearch}>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
        className={inputClassName}
      />
      <button onClick={handleSearch} className="w-1/5">
        아이콘
      </button>
    </div>
  );
}

export default Search;
