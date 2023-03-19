import React, { useState } from "react";
import SearchBar from "./SearchBar";
import useToggle from "../../../hooks/useToggle";
import FilterCategories from "./FilterCategories";
import { useAppDispatch, useAppSelector } from "../../../app/reduxHooks";
import { clearAllFilters } from "../filterSlice";
import { getTags } from "../api/index";

const Filter = () => {
  const selectFilters = useAppSelector((state) => state.filter.filters);
  const selectIsError = useAppSelector((state) => state.filter.error.isError);
  const selectErrorMessage = useAppSelector(
    (state) => state.filter.error.errorMessage
  );
  const selectNumberActiveFilters = useAppSelector((state) => {
    return state.filter.filters
      .flatMap((category) => [...category.items])
      .reduce((acc, curItem) => acc + (curItem.active ? 1 : 0), 0);
  });
  const dispatch = useAppDispatch();

  const [active, toggleActive] = useToggle();

  const handleClearAllFilters = () => {
    console.log("Clearing all filters");
    dispatch(clearAllFilters());
  };

  // load tags from Firestore
  getTags();

  return (
    <div className="rounded-xl bg-primary p-4">
      <SearchBar toggleActive={toggleActive} />

      {active && (
        <>
          <div className="my-2 flex justify-between">
            <div>
              Filter
              <span className="ml-2 rounded-lg bg-gray-200 p-1">
                {selectNumberActiveFilters}
              </span>
            </div>
            <button className="text-[#5fa3e1]" onClick={handleClearAllFilters}>
              Clear all
            </button>
          </div>
          {selectIsError && <p>{selectErrorMessage}</p>}
          {selectFilters.map((category, index: number) => (
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
