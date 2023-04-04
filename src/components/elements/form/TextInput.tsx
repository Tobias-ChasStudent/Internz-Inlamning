import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type TextInputProps<T extends FieldValues> = {
  label: string;
  id: string;
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegister<T>;
  required?: boolean;
};

const TextInput = <T extends FieldValues>({
  label,
  id,
  placeholder,
  error,
  register,
  required = false,
}: TextInputProps<T>) => {
  const inputClassNames = `box-border py-2 px-3 w-full rounded-xl bg-secondary pr-10 text-sm outline-none ${
    error ? "border-2 border-red-400" : "border-2 border-transparent"
  }`;

  return (
    <label htmlFor={id} className="flex flex-col gap-1">
      {label}
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        {...register(id as Path<T>, { required })}
        className={inputClassNames}
      />
    </label>
  );
};

export default TextInput;
