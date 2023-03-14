import React from "react";
import SearchBar from "./SearchBar";
import useToggle from "../../../hooks/useToggle";
import FilterItem from "./FilterItem";

const Filter = () => {
  const [active, toggleActive] = useToggle();

  const placeholderArray: Array<any> = [];

  type Props = {
    key: number;
    item: object;
  };

  return (
    <div className="rounded-xl bg-primary p-4">
      <SearchBar toggleActive={toggleActive} />
      {active &&
        placeholderArray.map((item, index) => (
          <FilterItem key={index} item={item} />
        ))}
    </div>
  );
};

export default Filter;
