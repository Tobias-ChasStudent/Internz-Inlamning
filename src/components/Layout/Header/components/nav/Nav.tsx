import { NavLinks } from "../../constants";
import Link from "./Link";
import Menu from "./Menu";
import { AnimatePresence } from "framer-motion";

const Nav = () => {
  return (
    <div>
      <div className="sm:hidden">
        <Menu links={NavLinks} />
      </div>
      <nav className="max-sm:hidden ">
        <ul className="flex gap-8">
          <AnimatePresence>
            {NavLinks.map((link, index) => (
              <Link {...link} key={index} />
            ))}
          </AnimatePresence>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
