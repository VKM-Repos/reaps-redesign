import React from "react";
import SearchIcon from "./Icons/Search";
import { useGlobalFilter } from "@/context/GlobalFilterContext";

const SearchGlobal = () => {
  const { globalFilter, setGlobalFilter } = useGlobalFilter();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };
  return (
    <div className="flex py-3 px-4 gap-2 border border-[#0E0F0C1F] rounded-[0.625rem] w-full min-w-[13rem] md:min-w-[21rem]">
      <SearchIcon />
      <input
        name="search"
        placeholder="Search"
        type="search"
        value={globalFilter}
        onChange={handleSearchChange}
        className="border-none hover:border-none focus:border-none  w-full focus-visible:outline-none"
      />
    </div>
  );
};

export default SearchGlobal;
