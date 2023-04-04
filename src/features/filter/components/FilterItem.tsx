import React, { useState, useEffect } from "react";

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
  const [isChecked, setIsChecked] = useState(item.active);

  useEffect(() => {
    // this is a work around for bug below, error still persists
    setIsChecked(item.active);
  }, [item]);

  const onCheckTag = () => {
    handleCheckTag(index);
    // setIsChecked(!item.active);
  };

  //BUG error 'uncontrolled input' on checkbox
  return (
    <div className="mb-2 flex justify-between">
      <label>
        <input
          type="checkbox"
          className="mr-4"
          checked={isChecked}
          onChange={onCheckTag}
        />
        <span>{item.tag}</span>
      </label>
    </div>
  );
};

export default FilterItem;
