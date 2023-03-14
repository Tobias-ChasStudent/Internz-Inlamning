import { HiBars3BottomLeft } from "react-icons/hi2";
import useToggle from "../../../../../hooks/useToggle";
import { LinkType } from "../../types";

type MenuProps = {
  links: LinkType[];
};

const Menu = ({ links }: MenuProps) => {
  const [active, toggleActive] = useToggle();

  return (
    <div>
      <button onClick={toggleActive} className="rounded-xl bg-primary p-2">
        <HiBars3BottomLeft className="text-2xl" />
      </button>
    </div>
  );
};
export default Menu;
