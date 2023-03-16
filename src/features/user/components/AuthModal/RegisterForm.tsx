import ContinueWithGoogleButton from "./ContinueWithGoogleButton";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { registerWithEmailAndPassword } from "../../api";

type RegisterFormProps = {
  type: AccountType;
  setMode: (mode: RegisterMode) => void;
};

const inputClassName = (error: FieldError | undefined) =>
  `h-10 w-full rounded-xl bg-secondary pl-3 pr-10 text-sm outline-none ${
    error ? "border-2 border-red-400" : "border-2 border-transparent"
  }`;

const RegisterForm = ({ type, setMode }: RegisterFormProps) => {
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
  } = useForm<RegisterFormTypes>();

  const onSubmit: SubmitHandler<RegisterFormTypes> = async (data) => {
    console.log(data);
    try {
      await registerWithEmailAndPassword(
        data.email,
        data.password,
        data.name,
        type
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <ContinueWithGoogleButton />
      or
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-3"
      >
        <input
          type="text"
          placeholder="Full name"
          {...register("name", { required: true })}
          className={inputClassName(errors.name)}
        />
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          className={inputClassName(errors.email)}
        />
        {["Password", "Confirm password"].map((placeholder, index) => (
          <div className="relative flex items-center" key={index}>
            <input
              type={showPasswords ? "text" : "password"}
              placeholder={placeholder}
              {...register(index === 0 ? "password" : "password_confirm", {
                validate:
                  index === 1
                    ? (value) => value === watch("password")
                    : undefined,
                required: true,
                minLength: 6,
                maxLength: 24,
              })}
              className={inputClassName(
                index === 0 ? errors.password : errors.password_confirm
              )}
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
        ))}
        <button
          onClick={() => setMode(null)}
          className="rounded-xl bg-secondary py-2"
        >
          Back
        </button>
        <button type="submit" className="rounded-xl bg-black py-2 text-white">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
