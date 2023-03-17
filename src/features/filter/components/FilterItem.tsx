import React from "react";

type ItemsTypes = {
  tag: string;
  amount: number;
  active: boolean;
};

type Props = {
  item: ItemsTypes;
  index: number;
  handleCheckTag: (tagIndex: number) => void;
};

const FilterItem = ({ item, index, handleCheckTag }: Props) => {
  const onCheckTag = () => {
    handleCheckTag(index);
  };

  return (
    <div className="mb-2 flex justify-between">
      <label>
        <input
          type="checkbox"
          className="mr-4"
          checked={item.active}
          onChange={onCheckTag}
        />
        <span>{item.tag}</span>
      </label>
      <span className="text-gray-400">{item.amount}</span>
    </div>
  );
};

export default FilterItem;
