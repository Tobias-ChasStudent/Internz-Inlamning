import React from "react";
import SearchBar from "./SearchBar";
import useToggle from "../../../hooks/useToggle";
import FilterCategories from "./FilterCategories";
import { useAppDispatch, useAppSelector } from "../../../app/reduxHooks";
import { clearAllFilters } from "../filterSlice";

const Filter = () => {
  const [active, toggleActive] = useToggle();
  const filters = useAppSelector((state) => state.filter.filters);
  const dispatch = useAppDispatch();

  const handleClearAllFilters = () => {
    console.log("Clearing all filters");
    dispatch(clearAllFilters());
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
