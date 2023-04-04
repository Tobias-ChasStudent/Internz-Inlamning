import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import Register from "./Register";
import Verify from "./Verify";
import { AnimatePresence, motion } from "framer-motion";
import { logout } from "../../api";
import LoginForm from "./LoginForm";
import CompanyForm from "./CompanyForm";

type AuthModalProps = {
  initialMode: "register" | "verify" | "company";
  toggleActive: () => void;
};

const AuthModal = ({ initialMode, toggleActive }: AuthModalProps) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleLogout = async () => {
    try {
      await logout();
      setMode("register");
    } catch (e) {
      console.error(e);
    }
  };

  const getTitle = () => {
    const titles = {
      login: "Login",
      register: "Register",
      verify: (
        <div>
          Register / <span className="text-secondary">Verify</span>
        </div>
      ),
      company: (
        <div>
          Register / <span className="text-secondary">Company</span>
        </div>
      ),
    };
    return <div>{titles[mode]}</div>;
  };

  const getBottomText = () => {
    const bottomTexts = {
      login: (
        <>
          Don't have an account?
          <button onClick={() => setMode("register")} className="font-bold">
            Register
          </button>
        </>
      ),
      register: (
        <>
          Already registered?
          <button onClick={() => setMode("login")} className="font-bold">
            Login
          </button>
        </>
      ),
      verify: (
        <>
          Verify later?
          <button onClick={handleLogout} className="font-bold">
            Logout
          </button>
        </>
      ),
      company: (
        <>
          Register a company later?
          <button onClick={handleLogout} className="font-bold">
            Logout
          </button>
        </>
      ),
    };

    return <div className="flex justify-center gap-1">{bottomTexts[mode]}</div>;
  };

  return createPortal(
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={toggleActive}
      className="absolute inset-0 grid place-items-center bg-black/50"
    >
      <motion.aside
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.1 }}
        onMouseDown={(e) => e.stopPropagation()}
        className="mx-2 grid auto-rows-auto grid-cols-[minmax(auto,_400px)] gap-3 overflow-hidden rounded-2xl bg-white p-3"
      >
        <div className="flex items-center justify-between">
          {getTitle()}
          <button
          title='close'
            onClick={toggleActive}
            className="rounded-xl bg-secondary p-3"
          >
            <IoClose />
          </button>
        </div>
        <AnimatePresence initial={false}>
          {mode === "register" && <Register />}
          {mode === "login" && <LoginForm />}
          {mode === "verify" && <Verify />}
          {mode === "company" && <CompanyForm />}
        </AnimatePresence>
        {getBottomText()}
      </motion.aside>
    </motion.aside>,
    document.body
  );
};

export default AuthModal;
