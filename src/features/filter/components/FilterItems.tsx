import React from "react";

type placeholderTypes = {
  name: string;
  items: Array<any>;
};

const handleClearCategory = () => {
  console.log("Clearing category");
};

const FilterItem = (props: object) => {
  const placeholderObject: placeholderTypes = {
    name: "Filter category",
    items: [{ asd: 123 }, { asd: 123 }, { asd: 123 }],
  };

  return (
    <div className="my-4">
      <div className="mb-2 flex justify-between">
        <span className="font-bold">{placeholderObject.name}</span>
        <button className="text-[#5fa3e1]" onClick={handleClearCategory}>
          Clear
        </button>
      </div>
      {placeholderObject.items.map((item, index) => (
        <div className="mb-2 flex justify-between" key={index}>
          <label>
            <input type="checkbox" className="mr-4" />
            <span>{"filter tag name"}</span>
          </label>
          <span className="text-gray-400">{"amount"}</span>
        </div>
      ))}
    </div>
  );
};

export default FilterItem;
