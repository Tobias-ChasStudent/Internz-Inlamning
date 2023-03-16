import { createPortal } from "react-dom";
import { logout } from "../../api";

const UserModal = () => {
  return (
    <>
      <div
        onClick={(e) => e.preventDefault()}
        className="absolute right-0 top-14 z-10 grid place-items-center rounded-2xl bg-white"
      >
        <div className=" p-3">
          <a onClick={logout}>Logout</a>
        </div>
      </div>
      {createPortal(
        <div className="absolute inset-0 bg-black/50">helo</div>,
        document.body
      )}
    </>
  );
};

export default UserModal;
