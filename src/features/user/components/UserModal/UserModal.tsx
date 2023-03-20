import { createPortal } from "react-dom";
import { logout } from "../../api";

type UserModalProps = {
  toggleActive: () => void;
};

const UserModal = ({ toggleActive }: UserModalProps) => {
  return (
    <>
      <div
        onMouseDown={(e) => e.preventDefault()}
        className="absolute right-0 top-14 z-10 grid place-items-center rounded-2xl bg-white"
      >
        <div className=" p-3">
          <button onClick={logout} className="cursor-pointer">
            Logout
          </button>
        </div>
      </div>
      {createPortal(
        <div
          onMouseDown={toggleActive}
          className="absolute inset-0 bg-black/50"
        />,
        document.body
      )}
    </>
  );
};

export default UserModal;
