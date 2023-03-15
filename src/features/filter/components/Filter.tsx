import React from "react";
import SearchBar from "./SearchBar";
import useToggle from "../../../hooks/useToggle";
import FilterItems from "./FilterItems";

const handleClearAllFilters = () => {
  console.log("Clearing all filters");
};

const Filter = () => {
  const [active, toggleActive] = useToggle();

  const placeholderArray: Array<any> = [
    { name: "category 1", items: [{ asd: 123 }, { asd: 123 }, { asd: 123 }] },
    { name: "category 1", items: [{ asd: 123 }, { asd: 123 }, { asd: 123 }] },
  ];

  type Props = {
    key: number;
    cat: object;
    index: boolean;
  };

  return (
    <div className="rounded-xl bg-primary p-4">
      <SearchBar toggleActive={toggleActive} />

      {active && (
        <>
          <div className="my-2 flex justify-between">
            <div>
              Filter{" "}
              <span className="rounded-lg bg-gray-200 p-1">{"amount"}</span>
            </div>
            <button className="text-[#5fa3e1]" onClick={handleClearAllFilters}>
              Clear all
            </button>
          </div>
          {placeholderArray.map((cat, index) => (
            <FilterItems key={index} />
          ))}
        </>
      )}
    </div>
  );
};

export default Filter;
