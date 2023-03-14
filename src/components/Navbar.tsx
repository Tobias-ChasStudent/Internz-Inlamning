import User from "../features/user/components/User.tsx/user";
import Branding from "./Branding";
import Menu from "./menu/Menu";

const Navbar = () => {
  return (
    <div className="grid grid-cols-nav items-center">
      <div className="sm:hidden">
        <Menu />
      </div>
      <Branding />
      <div className="justify-self-end">
        <User />
      </div>
    </div>
  );
};
export default Navbar;
