import { createPortal } from "react-dom";
import { HiUserCircle } from "react-icons/hi";
import useToggle from "../../../hooks/useToggle";
import useAuthState from "../hooks/useAuthState";
import AuthModal from "./AuthModal/AuthModal";
import UserModal from "./UserModal/UserModal";

const User = () => {
  const [active, toggleActive] = useToggle();
  const { user } = useAuthState();

  const GetModal = (): JSX.Element => {
    if (user) {
      if (!user.verified)
        return <AuthModal initialMode="verify" toggleActive={toggleActive} />;
      else if (!user.company)
        return <AuthModal initialMode="company" toggleActive={toggleActive} />;
      return <UserModal />;
    }
    return <AuthModal initialMode="register" toggleActive={toggleActive} />;
  };

  return (
    <div>
      <button
        onClick={toggleActive}
        className="relative flex h-10  items-center gap-2 rounded-xl max-sm:bg-white sm:bg-secondary"
      >
        {user ? (
          <>
            <img
              src={
                user.photo ??
                `https://ui-avatars.com/api/?name=${user.username}&background=random`
              }
              alt="Profile picture"
              className="h-full rounded-xl"
            />
            <div className="pr-3 max-sm:hidden">{user.username}</div>
          </>
        ) : (
          <>
            <HiUserCircle className="mx-2 text-2xl" />
            <div className="max-sm:hidden">Login/Register</div>
          </>
        )}
      </button>
      {active && GetModal()}
    </div>
  );
};

export default User;
