import React from "react";

const FilterItem = (props: object) => {
  return (
    <div className="flex justify-between">
      <label>
        <input type="checkbox" className="mr-4" />
        <span>{"filter tag name"}</span>
      </label>
      <span className="text-gray-400">{"amount"}</span>
    </div>
  );
};

export default FilterItem;
