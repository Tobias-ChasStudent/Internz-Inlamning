import { useRef, useState } from "react";
import { BiSearch, BiFilter, BiXCircle } from "react-icons/bi";
import { setSearchTerm, RemoveSearchTerm } from "../filterSlice";
import { useAppDispatch, useAppSelector } from "../../../app/reduxHooks";

type Props = {
  toggleActive: React.MouseEventHandler<HTMLButtonElement>;
};

const SearchBar = ({ toggleActive }: Props) => {
  const searchTerm = useAppSelector((state) => state.filter.searchTerm);
  console.log(searchTerm);
  const dispatch = useAppDispatch();

  const searchFieldRef = useRef<HTMLInputElement | null>(null);

  const [removeButtonValue, setRemoveButtonValue] = useState<string | null>(
    null
  );

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchFieldRef.current) {
      if (!searchFieldRef.current.value.length) return;

      dispatch(setSearchTerm(searchFieldRef.current.value));
      console.log(searchFieldRef.current.value);
      console.log("submit search");
    }
  };

  const handleRemoveSearchTerm = () => {
    if (searchFieldRef.current) {
      searchFieldRef.current.value = "";
      setRemoveButtonValue(null);
      dispatch(RemoveSearchTerm());
    }
  };

  const handleToggleRemoveButton = () => {
    if (searchFieldRef.current) {
      setRemoveButtonValue(searchFieldRef.current.value);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="flex justify-between">
        <div className="relative flex w-full">
          <BiSearch className="mr-4 text-2xl" />
          <input
            className="w-full"
            type="search"
            placeholder="Search"
            ref={searchFieldRef}
            onChange={handleToggleRemoveButton}
          ></input>
          {removeButtonValue && (
            <button
              type="button"
              className="absolute right-1 top-1"
              onClick={handleRemoveSearchTerm}
            >
              <BiXCircle />
            </button>
          )}
        </div>
        <button type="button" onClick={toggleActive}>
          <BiFilter className="text-2xl" />
        </button>
      </div>
      <button
        type="submit"
        className="mt-4 h-9 w-[100%] rounded-xl bg-black text-white"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
