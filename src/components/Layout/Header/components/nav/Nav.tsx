import { NavLinks } from "../../constants";
import Link from "./Link";
import Menu from "./Menu";
import { AnimatePresence } from "framer-motion";
import useToggle from "../../../../../hooks/useToggle";

const Nav = () => {
  const [active, toggleActive] = useToggle();

  return (
    <div className="sm:col-start-2">
      <div className="sm:hidden">
        <Menu active={active} toggleActive={toggleActive} />
      </div>
      <nav className="max-sm:hidden ">
        <ul className="flex gap-8 ">
          <AnimatePresence>
            {NavLinks.map((link, index) => (
              <Link {...link} key={index} indicatorMode="horizontal" />
            ))}
          </AnimatePresence>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
