import { createPortal } from "react-dom";
import { HiUserCircle } from "react-icons/hi2";
import useToggle from "../../../hooks/useToggle";
import AuthModal from "./AuthModal/AuthModal";

const User = () => {
  const [active, toggleActive] = useToggle();

  return (
    <div>
      <button
        onClick={toggleActive}
        className="relative flex gap-2 rounded-xl p-2 max-sm:bg-white sm:bg-secondary"
      >
        <HiUserCircle className="text-2xl" />
        <div className="max-sm:hidden">Login/Register</div>
        {createPortal(active && <AuthModal />, document.body)}
      </button>
    </div>
  );
};

export default User;
