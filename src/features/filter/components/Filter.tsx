import React from "react";
import SearchBar from "./SearchBar";
import useToggle from "../../../hooks/useToggle";
import type { RootState } from "../../../store";
import { useSelector, useDispatch } from "react-redux";
import FilterCategories from "./FilterCategories";

const handleClearAllFilters = () => {
  console.log("Clearing all filters");
};

const Filter = () => {
  const [active, toggleActive] = useToggle();
  const filters = useSelector((state: RootState) => state.filter.filters);
  const dispatch = useDispatch();

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
          {filters.map((category, index: number) => (
            <FilterCategories
              key={index}
              category={category}
              catIndex={index}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Filter;
