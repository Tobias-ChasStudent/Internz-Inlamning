import { HiBars3BottomLeft } from "react-icons/hi2";
import { AnimatePresence } from "framer-motion";
import { NavLinks } from "../../constants";
import Link from "./Link";
import { motion } from "framer-motion";

type MenuProps = {
  active: boolean;
  toggleActive: () => void;
};

const Menu = ({ active, toggleActive }: MenuProps) => {
  return (
    <>
      <div>
        <button onClick={toggleActive} title="Toggle menu" className="rounded-xl bg-primary p-2">
          <HiBars3BottomLeft className="text-2xl" />
        </button>
      </div>
      <AnimatePresence>
        {active && (
          <motion.nav
            initial={{ height: 0 }}
            animate={{ height: "fit-content" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute top-14 left-2 mr-3 w-full overflow-hidden rounded-xl bg-primary"
          >
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
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};
export default Menu;
