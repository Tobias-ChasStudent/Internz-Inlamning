import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { logout } from "../../api";

type UserModalProps = {
  toggleActive: () => void;
  userId: string;
};

const UserModal = ({ toggleActive, userId }: UserModalProps) => {
  return (
    <>
      <div
        onMouseDown={(e) => e.preventDefault()}
        className="absolute right-0 top-14 z-10 grid place-items-center rounded-2xl bg-white"
      >
        <div className="flex flex-col items-start p-3">
          <button onClick={logout} className="cursor-pointer">
            Logout
          </button>
          <Link to={`/profile/${userId}`}>View profile</Link>
          <Link to='/profile/edit'>Edit user</Link>  
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
