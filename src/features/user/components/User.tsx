import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { HiUserCircle } from "react-icons/hi2";
import useToggle from "../../../hooks/useToggle";
import useAuthState from "../hooks/useAuthState";
import AuthModal from "./AuthModal/AuthModal";
import UserModal from "./UserModal/UserModal";

const User = () => {
  const [active, toggleActive] = useToggle();
  const { user } = useAuthState();
  const [ModalComponent, setModalComponent] = useState<JSX.Element | null>(
    null
  );

  const getModal = () => {
    if (user) {
      if (!user.verified)
        return <AuthModal initialMode="verify" toggleActive={toggleActive} />;
      else if (user.type === "company" && !user.company)
        return <AuthModal initialMode="company" toggleActive={toggleActive} />;
      return <UserModal toggleActive={toggleActive} />;
    }

    return <AuthModal initialMode="register" toggleActive={toggleActive} />;
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="relative">
      <button
        onClick={toggleActive}
        className=" flex h-10 items-center rounded-xl max-sm:bg-white sm:bg-secondary"
      >
        {user ? (
          <>
            <img
              src={
                user.photo ??
                `https://ui-avatars.com/api/?name=${user.username}&background=random`
              }
              alt="Profile picture"
              className="mr-2 h-full rounded-xl"
            />
            <div className="pr-3 max-sm:hidden">{user.username}</div>
          </>
        ) : (
          <>
            <HiUserCircle className="mx-2 text-2xl" />
            <div className="pr-3 max-sm:hidden">Login/Register</div>
          </>
        )}
      </button>
      <AnimatePresence>{active && getModal()}</AnimatePresence>
    </div>
  );
};

export default User;
