import { useRef } from "react";
import { BiSearch, BiFilter } from "react-icons/bi";

type Props = {
  toggleActive: React.MouseEventHandler<HTMLButtonElement>;
};

const SearchBar = ({ toggleActive }: Props) => {
  const searchFieldRef = useRef<HTMLInputElement | null>(null);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchFieldRef.current) {
      searchFieldRef.current.value = "";
      console.log("submit search");
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="flex justify-between">
        <div className="flex w-full">
          <BiSearch className="mr-4 text-2xl" />
          <input
            className="w-full"
            type="search"
            placeholder="Search"
            ref={searchFieldRef}
          ></input>
        </div>
        <button onClick={toggleActive}>
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
