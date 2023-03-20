import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type TextAreaInputProps<T extends FieldValues> = {
  label: string;
  id: string;
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegister<T>;
};

const TextAreaInput = <T extends FieldValues>({
  label,
  id,
  placeholder,
  error,
  register,
}: TextAreaInputProps<T>) => {
  const inputClassName = `py-2 px-3 w-full rounded-xl bg-secondary h-64 text-sm outline-none ${
    error ? "border-2 border-red-400" : "border-2 border-transparent"
  }`;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        {...register(id as Path<T>, { required: true })}
        placeholder={placeholder}
        className={inputClassName}
      />
    </div>
  );
};

export default TextAreaInput;
