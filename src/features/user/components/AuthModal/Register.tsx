import { useState } from "react";
import { IoBusiness, IoChevronForward } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa";
import RegisterForm from "./RegisterForm";
import { AnimatePresence, motion } from "framer-motion";
const Register = () => {
  const [mode, setMode] = useState<RegisterMode>(null);

  const getForm = () => {
    if (mode === "student")
      return <RegisterForm setMode={setMode} type="student" />;
    else if (mode === "company")
      return <RegisterForm setMode={setMode} type="company" />;
    else
      return (
        <motion.aside
          initial={{ translateX: -32 }}
          animate={{ translateX: 0 }}
          className="flex flex-col gap-3"
        >
          <button
            onClick={() => setMode("company")}
            className="flex items-center justify-between gap-3 rounded-xl bg-secondary px-3 py-2"
          >
            <div className="flex items-center gap-3">
              <IoBusiness />
              Company
            </div>
            <IoChevronForward />
          </button>
          <button
            onClick={() => setMode("student")}
            className="flex items-center justify-between gap-3 rounded-xl bg-secondary px-3 py-2"
          >
            <div className="flex items-center gap-3">
              <FaUserGraduate />
              Student
            </div>
            <IoChevronForward />
          </button>
        </motion.aside>
      );
  };

  return <AnimatePresence initial={false}>{getForm()}</AnimatePresence>;
};

export default Register;
