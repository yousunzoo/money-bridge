"use client";
import React, { useState } from "react";

function LocationSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log("Search term:", searchTerm);
  };

  return (
    <div className="border-gray mx-auto my-2 flex h-10 w-4/5 rounded-md border border-solid p-1">
      <button onClick={handleSearch} className="w-1/5">
        아이콘
      </button>
      <input
        type="text"
        placeholder="동명(읍,면) 으로 검색(ex.서초동)"
        value={searchTerm}
        onChange={handleInputChange}
        className="w-4/5 px-2 focus:outline-none"
      />
    </div>
  );
}

export default LocationSearch;
