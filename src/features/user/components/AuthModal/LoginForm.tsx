import { useState } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { loginWithEmailAndPassword } from "../../api";
import { motion } from "framer-motion";
import ContinueWithGoogleButton from "./ContinueWithGoogleButton";

const inputClassName = (error: FieldError | undefined) =>
  `h-10 w-full rounded-xl bg-secondary pl-3 pr-10 text-sm outline-none ${
    error ? "border-2 border-red-400" : "border-2 border-transparent"
  }`;

const LoginForm = () => {
  const [showPasswords, setShowPasswords] = useState(false);

  const togglePasswordVisibility = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowPasswords((state) => !state);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormTypes>();

  const onSubmit: SubmitHandler<LoginFormTypes> = async (data) => {
    try {
      await loginWithEmailAndPassword(data.email, data.password);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <motion.aside
      initial={{ translateX: 32 }}
      animate={{ translateX: 0 }}
      className="flex flex-col items-center gap-3"
    >
      <ContinueWithGoogleButton />
      or
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-3"
      >
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          className={inputClassName(errors.email)}
        />
        <div className="relative flex items-center">
          <input
            type={showPasswords ? "text" : "password"}
            placeholder="Password"
            {...register("password", {
              validate: (value) => value === watch("password"),
              required: true,
              minLength: 6,
              maxLength: 24,
            })}
            className={inputClassName(errors.password)}
          />
          <button
            onClick={togglePasswordVisibility}
            className="absolute right-3"
          >
            {showPasswords ? (
              <IoEyeOff className="text-primary" />
            ) : (
              <IoEye className="text-primary" />
            )}
          </button>
        </div>
        <button type="submit" className="rounded-xl bg-black py-2 text-white">
          Login
        </button>
      </form>
    </motion.aside>
  );
};

export default LoginForm;
