import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Login from "./Login";
import Register from "./Register";

const AuthModal = () => {
  const [mode, setMode] = useState<AuthMode>("register");
  const [title, setTitle] = useState("Register");

  const handleTitle = {};

  return (
    <div className="absolute inset-0 grid place-items-center bg-black/50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="mx-2 grid auto-rows-auto grid-cols-[minmax(auto,_400px)] gap-3 rounded-2xl bg-white p-3"
      >
        <div className="flex items-center justify-between">
          <div>{title}</div>
          <button className="rounded-xl bg-secondary p-3">
            <IoClose />
          </button>
        </div>
        {mode === "register" && <Register />}
        {mode === "login" && <Login />}
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
