import React from "react";
import FilterItem from "./FilterItem";
import { setFilter } from "../filterSlice";
import { useAppDispatch } from "../../../app/reduxHooks";

type ItemsTypes = {
  tag: string;
  amount: number;
  active: boolean;
};

type CategoryTypes = {
  name: string;
  items: Array<ItemsTypes>;
};

type PropsTypes = {
  category: CategoryTypes;
  catIndex: number;
};

const handleClearCategory = () => {
  console.log("Clearing category");
};

const FilterCategories = ({ category, catIndex }: PropsTypes) => {
  const dispatch = useAppDispatch();

  const handleCheckTag = (tagIndex: number) => {
    dispatch(setFilter({ tagIndex: tagIndex, catIndex: catIndex }));
  };

  return (
    <div className="my-4">
      <div className="mb-2 flex justify-between">
        <span className="font-bold">{category.name}</span>
        <button className="text-[#5fa3e1]" onClick={handleClearCategory}>
          Clear
        </button>
      </div>
      {category.items.map((item: ItemsTypes, index: number) => (
        <FilterItem
          key={index}
          item={item}
          index={index}
          handleCheckTag={handleCheckTag}
        />
      ))}
    </div>
  );
};

export default FilterCategories;
