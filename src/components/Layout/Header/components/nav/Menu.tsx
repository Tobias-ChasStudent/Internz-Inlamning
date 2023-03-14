import { HiBars3BottomLeft } from "react-icons/hi2";
import { AnimatePresence } from "framer-motion";
import { NavLinks } from "../../constants";
import Link from "./Link";

type MenuProps = {
  active: boolean;
  toggleActive: () => void;
};

const Menu = ({ active, toggleActive }: MenuProps) => {
  return (
    <>
      <div>
        <button onClick={toggleActive} className="rounded-xl bg-primary p-2">
          <HiBars3BottomLeft className="text-2xl" />
        </button>
      </div>
      {active && (
        <nav className="absolute top-14 left-2 rounded-xl bg-primary">
          <ul>
            <AnimatePresence>
              {NavLinks.map((link, index) => (
                <Link
                  path={link.path}
                  text={link.text}
                  indicatorMode={"vertical"}
                  key={index}
                />
              ))}
            </AnimatePresence>
          </ul>
        </nav>
      )}
    </>
  );
};
export default Menu;
