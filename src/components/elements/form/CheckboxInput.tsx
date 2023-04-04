import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { IoCheckmark } from "react-icons/io5";

type CheckboxInputProps<T extends FieldValues> = {
  label: string;
  id: string;
  error?: FieldError;
  register: UseFormRegister<T>;
  required?: boolean;
  value: string;
};

const CheckboxInput = <T extends FieldValues>({
  label,
  id,
  error,
  register,
  required = false,
  value,
}: CheckboxInputProps<T>) => {
  const inputClassNames = `flex items-center gap-2 rounded-xl bg-secondary py-2 px-3 ${
    error ? "border-2 border-red-400" : "border-2 border-transparent"
  }`;

  return (
    <label htmlFor={value} className={inputClassNames}>
      <div className="relative grid h-4 w-4 place-items-center">
        <input
          id={value}
          type="checkbox"
          {...register(id as Path<T>, { required })}
          value={value}
          className="peer absolute h-full w-full appearance-none rounded-[4px] bg-tertiary transition-colors duration-200 checked:bg-accnet"
        />
        <IoCheckmark className="aboslute pointer-events-none z-10 hidden text-xs text-white peer-checked:block" />
      </div>
      {label}
    </label>
  );
};

export default CheckboxInput;
