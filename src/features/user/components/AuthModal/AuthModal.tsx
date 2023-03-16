import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Company from "./Company";
import Login from "./Login";
import Register from "./Register";
import Verify from "./Verify";

type AuthModalProps = {
  initialMode: "register" | "verify" | "company";
  toggleActive: () => void;
};

const AuthModal = ({ initialMode, toggleActive }: AuthModalProps) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const GetTitle = () => {
    switch (mode) {
      case "login":
        return <div>Login</div>;
      case "register":
        return <div>Register</div>;
      case "verify":
        return (
          <div>
            Register / <span className="text-secondary">Verify</span>
          </div>
        );
      case "company":
        return (
          <div>
            Register / <span className="text-secondary">Company</span>
          </div>
        );
    }
  };

  return (
    <div
      onMouseDown={toggleActive}
      className="absolute inset-0 grid place-items-center bg-black/50"
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="mx-2 grid auto-rows-auto grid-cols-[minmax(auto,_400px)] gap-3 rounded-2xl bg-white p-3"
      >
        <div className="flex items-center justify-between">
          {GetTitle()}
          <button
            onClick={toggleActive}
            className="rounded-xl bg-secondary p-3"
          >
            <IoClose />
          </button>
        </div>
        {mode === "register" && <Register />}
        {mode === "login" && <Login />}
        {mode === "verify" && <Verify />}
        {mode === "company" && <Company />}
        <div className="text-center ">
          Already registered?{" "}
          <button onClick={() => setMode("login")} className="font-bold">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
