import { User } from "../../../../features/user";
import Branding from "./Branding";
import Nav from "./nav/Nav";

const Navbar = () => {
  return (
    <div className="grid grid-cols-main justify-center px-2 max-sm:pt-2 sm:bg-primary">
      <div className="grid grid-cols-nav items-center sm:h-14 sm:rounded-xl">
        <div className="sm:hidden">
          <Nav />
        </div>
        <Branding />
        <div className="h-full max-sm:hidden">
          <Nav />
        </div>
        <div className="justify-self-end">
          <User />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
