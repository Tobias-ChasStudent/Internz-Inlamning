import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type PictureInputProps<T extends FieldValues> = {
  label: string;
  id: string;
  error?: FieldError;
  register: UseFormRegister<T>;
  required?: boolean;
  preview: string;
};

const PictureInput = <T extends FieldValues>({
  label,
  id,
  preview,
  register,
  error,
  required = false,
}: PictureInputProps<T>) => {
  return (
    <div className="flex items-center gap-2">
      <img src={preview} alt="Avatar" className="h-16 w-16 rounded-xl" />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="logo">{label}</label>
        <input
          type="file"
          id={id}
          accept="image/*"
          {...register(id as Path<T>, { required })}
        />
      </div>
    </div>
  );
};

export default PictureInput;
