import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type DateInputProps<T extends FieldValues> = {
  label: string;
  id: string;
  error?: FieldError;
  register: UseFormRegister<T>;
  required?: boolean;
};

const DateInput = <T extends FieldValues>({
  label,
  id,
  error,
  required = false,
  register,
}: DateInputProps<T>) => {
  const inputClassNames = `rounded-xl bg-secondary py-2 px-3 outline-none ${
    error ? "border-2 border-red-400" : "border-2 border-transparent"
  }`;

  return (
    <label htmlFor="start_date" className="flex flex-col gap-1">
      {label}
      <input
        id={id}
        type="date"
        {...register(id as Path<T>, { required })}
        className={inputClassNames}
      />
    </label>
  );
};

export default DateInput;
