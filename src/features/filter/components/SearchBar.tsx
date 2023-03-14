import React from "react";
import { BiSearch, BiFilter } from "react-icons/bi";

type Props = { toggleActive: React.MouseEventHandler<HTMLButtonElement> };

const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("submit search");
};

const SearchBar = ({ toggleActive }: Props) => {
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="flex justify-between">
        <div className="flex">
          <BiSearch className="text-2xl" />
          <input type="search" placeholder="Search"></input>
        </div>
        <button onClick={toggleActive}>
          <BiFilter className="text-2xl" />
        </button>
      </div>
      <button type="submit" className="w-[100%] bg-black text-white">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
