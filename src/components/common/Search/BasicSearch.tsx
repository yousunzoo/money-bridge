"use client";
import React, { useState } from "react";

function BasicSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event:any) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log("Search term:", searchTerm);
  };

  return (
    <div className="mx-auto my-2 flex h-10 w-4/5 rounded-md border border-solid border-gray p-1">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
        className="focus:outline-none w-4/5 px-2"
      />
      <button onClick={handleSearch} className="w-1/5">
        아이콘
      </button>
    </div>
  );
}

export default BasicSearch;
